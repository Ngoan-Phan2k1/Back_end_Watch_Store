const Category = require("../model/category");
const Products = require("../model/product");

const categoryController = {
    getAllCategory: async(req, res) => {
        try{
            const categories = await Category.find();
            res.json(categories);
            
        } catch(err) {
            res.status(500).json(err);
        }
    },


    getOneCategory: async(req, res) => {
        try{
            const categories = await Category.findById(req.params.id);
            res.json(categories);
            
        } catch(err) {
            res.status(500).json(err);
        }
    },

    createCategory: async (req, res) => {
        try{
            const {name, images} = req.body;
            const category = await Category.findOne({name});
            if(category) return res.status(400).json({msg: "Thương hiệu này đã tồn tại"});
            if(!images) return res.status(400).json({msg: "Ảnh không được để trống"});
            const newCategory = new Category({name, images});
            await newCategory.save();
            res.json({msg: "Thêm thương hiệu thành công"});


        }catch(err) {
            res.status(500).json({msg: err.message});
        }
    },
    
    deleteCategory: async (req, res) => {
        try{
            const products = await Products.findOne({category: req.params.id});
            if(products) return res.status(400).json({msg: "Xin hãy xóa hết các sản phẩm có liên quan trước"})
            await Category.findByIdAndDelete(req.params.id);
            res.json({msg: "Thương hiệu đã được xóa"});


        }catch(err) {
            res.status(500).json({msg: err.message});
        }
    },

    updateCategory: async (req, res) => {
        try{
            const {name} = req.body;
            await Category.findByIdAndUpdate({_id: req.params.id}, {name});

            res.json({msg: "Update a category"});


        }catch(err) {
            res.status(500).json({msg: err.message});
        }
    }

}

module.exports = categoryController;