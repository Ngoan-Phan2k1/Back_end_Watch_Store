const {Sanpham, Loai} = require("../model/model");

const sanphamController = {
    //ADD sanpham
    addSanpham: async (req, res) => {

        try{
            const newSanpham = new Sanpham(req.body);      
            const savedSanpham = await newSanpham.save();
            if(req.body.loai) {
                const resultLoai = Loai.findById(req.body.loai);
                await resultLoai.updateOne({$push: {sanpham: savedSanpham._id}});
            }
            res.status(200).json(savedSanpham);

        } catch(err) {
            
            res.status(500).json(err);
        }
    },

    //GET ALL sanphams
    getAllsanpham: async(req, res) => {
        try {
            const sanpham = await Sanpham.find();
            res.status(200).json(sanpham);

        } catch(err) {
            res.status(500).json(err);
        }
    },

    //GET 1 SANPHAM
    getOnesanpham: async(req, res) => {
        try{
            //const { id } = req.query;

            const sanpham = await Sanpham.findById(req.params.id).populate("loai");
            //const sanpham = await Sanpham.findById(id).populate("loai");
            res.status(200).json(sanpham);
        }
        catch(err) {
            res.status(500).json(err);
            //return res.status(400).json({ message: 'Không thể lấy dữ liệu' });
        }
    },

    //UPDATE 1 SANPHAM
    updateSanpham: async(req, res) => {
        try {
            const sanpham = await Sanpham.findById(req.params.id);
            await sanpham.updateOne( { $set: req.body} );
            res.status(200).json("Updated successfully!!!");
        } catch(err) {
            res.status(500).json(err);
        }
    },

    //DELETE 1 SAN PHAM
    deleteSanpham: async(req, res) => {
        try {
            await Loai.updateMany( 
                { sanpham: req.params.id }, 
                { $pull: {sanpham: req.params.id}} 
            );
            await Sanpham.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully !!!");
        } catch(err) {
            res.status(500).json(err);
            
        }
    }
};


module.exports = sanphamController;