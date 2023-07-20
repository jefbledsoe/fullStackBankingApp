const {Schema, model} = require('mongoose');

const authorizedUsersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 20
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 20
    },
    phoneNumber: {
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

const AuthorizedUsers = model('AuthorizedUsers', authorizedUsersSchema);

module.exports = AuthorizedUsers;
    