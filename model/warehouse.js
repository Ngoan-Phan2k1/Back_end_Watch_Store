const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlenght: 20,
        unique: true
    },
    images: {
        type: Object,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
        }
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        }
    ],

}, {timestamps:true}
);

module.exports = mongoose.model("Warehouse", warehouseSchema);