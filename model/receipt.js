const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
        //unique: true
    },
          
}, {
    timestamps: true
})

module.exports = mongoose.model("Receipt", receiptSchema);