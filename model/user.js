const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlenght: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlenght: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlenght: 50,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: Array,
        default: [],
    },
    bookmark: {
        type: Array,
        default: [],   
    }

}, {timestamps:true}
);

module.exports = mongoose.model("User", userSchema);