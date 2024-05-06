const mongoose = require('mongoose');

// Define User Schema
const UserSchema  = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId, // Specify the type as ObjectId
        auto: true, // Set auto to true to let MongoDB generate unique IDs
        required: true // Make it required if needed
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
        type: [Boolean],
        default: [false, false, false, false] // Default value for all action - unchecked
    }
});

// Create User model
const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;