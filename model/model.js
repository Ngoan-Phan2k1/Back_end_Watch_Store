const mongoose = require("mongoose");

const sanphamSchema = new mongoose.Schema({
    ten: {
        type: String,
        required: true
    },
    imglink: {
        type: String
    },
    thumbnail: {
        type: [String],
    },
    giaban: {
        type: Number,
        required: true,
    },
    loai: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loai",
    },
    count: {
        type: Number,
    }
});

const loaiSchema = new mongoose.Schema({
    maloai: {
        type: String
    },
    ten: {
        type: String
    },
    sanpham: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sanpham",
        }
    ]

})

let Sanpham = mongoose.model("Sanpham", sanphamSchema);
let Loai = mongoose.model("Loai", loaiSchema);
module.exports = { Sanpham, Loai };