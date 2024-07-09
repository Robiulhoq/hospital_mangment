const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../utils/error.js');
const AuthSchema = require('../Schema/AuthSchema.js');
const User = mongoose.model("User", AuthSchema);

const rigister = async (req, res, next) => {
    try {
        const { username, email, password, userRole } = req.body;

        if (!username || !email || !password) {
            return next(createError(400, 'Username, email, and password are required.'));
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: username,
            email: email,
            password: hash,
            userRole: userRole
        });
        await newUser.save();
        res.status(200).send('User has been created.')
    } catch (error) {
        next(error)
    }
}


const login = async (req, res, next) => {
    
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return next(createError(404, 'User Not found!'));
        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrectPassword) return next(createError(404, 'password is worng or user name is worng'));

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)
        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).send({
            data: otherDetails,
            token: token
        });
    } catch (error) {
        next(error)
    }
}

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT);
        req.user = verified;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = { rigister, login, authenticateToken, User }