const mongoose = require('mongoose');
const InvoiceSchema = require('../Schema/InvoiceSchema.js')
const Invoice = mongoose.model("Invoice", InvoiceSchema);
const createError = require('../utils/error.js');

const createdInvoice = async (req, res, next) => {
    try {
        const { patientId, grandTotal, paid, due, invoice, vat, discount } = req.body;
        // Validate the incoming data (add more specific validation as needed)
        if (!patientId || !grandTotal || !paid || !due || !Array.isArray(invoice)) {
            return res.status(400).json({ error: 'Invalid or incomplete data provided' });
        }

        // Save the invoice to the database
        const savedInvoice = await Invoice.create({
            patientId,
            grandTotal,
            vat,
            discount,
            paid,
            due,
            invoice,
        });

        res.status(200).json(savedInvoice);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving patient data' });
    }
};



const putInvoice = async (req, res, next) => {
    try {
        const updateInvoice = await Invoice.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updateInvoice)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

}

const deleteInvoice = async (req, res, next) => {
    try {
        await Invoice.findByIdAndDelete(req.params.id);
        res.status(200).json("Invoice has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllInvoice = async (req, res, next) => {
    try {
        const Invoices = await Invoice.find();
        res.status(200).json(Invoices)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getOneInvoice = async (req, res, next) => {
    const patientId = req.params.id; // Assuming the parameter is named "patientId"

    try {
        const invoice = await Invoice.find({ patientId: patientId });

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found for the provided patientId' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        next(error);
    }
};
module.exports = { createdInvoice, putInvoice, deleteInvoice, getAllInvoice, getOneInvoice, Invoice };