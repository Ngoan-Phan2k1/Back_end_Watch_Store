const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    // product_id: {
    //     type: String,
    //     unique: true,
    //     require: true
    // },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    images: {
        type: Object,
        required: true
    },
    // thumbnails: {
    //     type: [String],
    //     default: [],
    // },
    thumbnails: {
        type: [Object],
        default: [],
    },
    price: {
        type: Number,
        required: true,
    },
    desription:{
        type: String,
    },
    checked:{
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true,
    },
    warehouse: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Products", productSchema);