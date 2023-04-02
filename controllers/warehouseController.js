const Warehouse = require("../model/warehouse");
const Products = require("../model/product");
const Categories = require("../model/category");





const warehouseController = {
    getAllWareHouse: async(req, res) => {
        try{
            const warehouse = await Warehouse.find().populate("products").populate("categories");

            // res.json({
            //     status: "Success",
            //     result: warehouse.length,
            //     warehouse: warehouse
            // });

            res.status(200).json(warehouse);

        }catch(err){
            return res.status(500).json(err);
        }
    },

    getOneWareHouse: async(req, res) => {
        try{
            const warehouse = await Warehouse.findById(req.params.id).populate("products").populate("categories");
            res.status(200).json(warehouse);
        } catch(err){
            return res.status(500).json(err);
        }
    },


    createWarehouse: async(req, res) => {
        try{
            //const {product_id, name,images, thumbnails,price, desription, category} = req.body;
            const {name,images, location, products, categories} = req.body;
            if(!images) return res.status(400).json({msg: "Không tồn tại ảnh upload"});
            const warehouse = await Warehouse.findOne({name});
            if(warehouse) return res.status(400).json({msg: "Kho đã tồn tại"});

            

            const newWarehouse = new Warehouse({
                name,images, location, products, categories
            })
            await newWarehouse.save();

            if(req.body.products){
                const product = Products.find({_id: req.body.products});
                await product.updateMany({$push: {warehouse: newWarehouse._id}});
            }

            res.status(200).json(newWarehouse);
        } catch(err) {
            return res.status(500).json(err);
        }
    },
    // updateProduct: async(req, res) => {
    //     try{
    //         const {product_id, name,images, thumbnails,price, desription, category} = req.body;

    //         await Products.findOneAndUpdate({_id: req.params.id}, {
    //             product_id, name,images, thumbnails,price, desription, category
    //         })

    //         res.status(200).json("Updated successfully!!!");
    //     } catch(err) {
    //         return res.status(500).json(err);
    //     }
    // }
}

module.exports = warehouseController;
