const Products = require("../model/product");



class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filltering(){
        const queryObj = {...this.queryString}  //queryString = req.query
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete(queryObj[el]));

        let queryStr = JSON.stringify(queryObj)

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match) //se match voi toan tu nhap vao ket qua vi du: $gte
       // console.log({queryObj, queryStr});
        this.query.find(JSON.parse(queryStr)); //trong ket qua lay ra all products lai loc theo 1 lan nua dua tren queryStr
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('');
            this.query = this.query.sort(sortBy);
            //console.log(sortBy);
        }
        else{
            this.query = this.query.sort('-createdAt'); //Sort theo ngay tao moi nhat neu khong co dieu kien sort
        }

        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6 //gioi han chi tim ra 3
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const productController = {
    getAllProductNotFilter: async(req, res) => {
        try{
            const products = await Products.find();

            // res.json({
            //     status: "Success",
            //     result: products.length,
            //     products: products
            // });

            res.status(200).json(products);
        }catch(err){
            return res.status(500).json(err);
        }
    },

    getAllProduct: async(req, res) => {
        try{
            //const features = new APIfeatures(Products.find(), req.query).filltering().sorting().paginating();
            const features = new APIfeatures(Products.find(), req.query).filltering().sorting().paginating();
            const products = await features.query;
            //const products = await Products.find();

            res.json({
                status: "Success",
                result: products.length,
                products: products
            });
        }catch(err){
            return res.status(500).json(err);
        }
    },



    createProduct: async(req, res) => {
        try{
            //const {product_id, name,images, thumbnails,price, desription, category} = req.body;
            const {name,images, thumbnails,price, desription, category, warehouse} = req.body;
            if(!images) return res.status(400).json({msg: "Không tồn tại ảnh upload"});
            const product = await Products.findOne({name});
            if(product) return res.status(400).json({msg: "Sản phẩm này đã tồn tại."});


            const newProduct = new Products({
               name,images, thumbnails,price, desription, category, warehouse
            })
            await newProduct.save();

            res.status(200).json(newProduct);
        } catch(err) {
            return res.status(500).json(err);
        }
    },

    deleteProduct: async(req, res) => {
        try{
            await Products.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully !!!");
        } catch(err) {
            return res.status(500).json(err);
        }
    },
    updateProduct: async(req, res) => {
        try{
            const {product_id, name,images, thumbnails,price, desription, category} = req.body;

            await Products.findOneAndUpdate({_id: req.params.id}, {
                product_id, name,images, thumbnails,price, desription, category
            })

            res.status(200).json("Updated successfully!!!");
        } catch(err) {
            return res.status(500).json(err);
        }
    },

    getOneProduct: async(req, res) => {
        try{
            const products = await Products.findById(req.params.id).populate("warehouse");

            // res.json({
            //     status: "Success",
            //     result: products.length,
            //     products: products
            // });

            res.status(200).json(products);
        }catch(err){
            return res.status(500).json(err);
        }
    },
}

module.exports = productController;
