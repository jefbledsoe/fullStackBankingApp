const {Schema, model} = require('mongoose');

const transactionsSchema = new Schema({
    transactor: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 40
    },
    date: {
        type: date,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 20
    },
    type: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 20
    },
    vendor: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 20
    },
    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    }
});

const Transactions = model('Transactions', transactionsSchema);

module.exports = Transactions;
    