const {Loai, Sanpham} = require("../model/model");

const loaiController= {
    //ADD 1 LOAI
    addLoai: async(req, res) => {
        try {
            const newLoai = new Loai(req.body);
            const savedLoai = await newLoai.save();
            res.status(200).json(savedLoai);

        } catch(err) {
            res.status(500).json(err);
        }
    },

    //GET ALL LOAI
    getAllLoai: async(req, res) => {
        try {
            const loai = await Loai.find();
            res.status(200).json(loai);

        } catch(err) {
            res.status(500).json(err);
        }
    },

    //GET ONE LOAI
    getOneLoai: async(req, res) => {
        try {
            const loai = await Loai.findById(req.params.id).populate("sanpham");
            res.status(200).json(loai);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    //UPDATE ONE LOAI
    updateLoai: async(req, res) => {
        try {
            const loai = await Loai.findById(req.params.id);
            await loai.updateOne( { $set: req.body} );
            res.status(200).json("Updated successfully!!!");

        } catch(err) {
            res.status(500).json(err);
        }
    },

    //DELETE LOAI
    deleteLoai: async(req, res) => {
        try{
            await Sanpham.updateMany( {loai: req.params.id}, {loai: null} );
            await Loai.findByIdAndDelete(req.params.id);
            res.status(200).json("deleted successfully!!!");
        } catch(err) {
            res.status(500).json(err);
        }
    }

};

module.exports = loaiController;