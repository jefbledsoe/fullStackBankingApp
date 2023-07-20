const {Schema, model} = require('mongoose');

const accountsSchema = new Schema({
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    accountCreationDate: {
        type: Date,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 20
    },
    balance: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 20
    },
    transactions: {
        type: Array,
        required: true,
        trim: true,
        minlength: 10
    },
    authorizedUsers: {
        type: Array,
        required: true,
        trim: true,
        minlength: 5
    }
});

const Accounts = model('Accounts', accountsSchema);

module.exports = Accounts;