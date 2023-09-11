const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    patientId: {
        type: String,
    },
    invoice: [
        {
            accoutName: {
                type: String,
                required: true
            },
            description: {
                type: String,
            },
            quantity: {
                type: Number,
            },
            price: {
                type: Number,
            },
            subTotal: {
                type: Number,
            },
        }
    ],
    grandTotal: {
        type: Number,
    },
    vat: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    paid: {
        type: Number,
    },
    due: {
        type: Number,
    },
}, { timestamps: true }); // Add timestamps option here





module.exports = InvoiceSchema;
