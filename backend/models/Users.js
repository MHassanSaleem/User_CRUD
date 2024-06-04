const mongoose = require('mongoose');

// Define User Schema
const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    actions: {
        type: {
            createItem: Boolean,
            deleteItem: Boolean,
            viewItem: Boolean,
            moveItem: Boolean
        },
        default: {
            createItem: false,
            deleteItem: false,
            viewItem: false,
            moveItem: false
        }
    }
});

// Create User model
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;