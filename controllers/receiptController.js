const Payments = require('../model/payment');
const Users = require('../model/user');
const Products = require('../model/product');
const Receipt = require('../model/receipt');





const receiptController = {
    getReceipts: async(req, res) => {
        try{
            const receipts = await Receipt.find(); 
            res.json(receipts);

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    createReceipt: async(req, res) => {
        try{
            // const {name, products} = req.body;
            // const newReceipt = new Receipt({
            //     name, products
            // })

            const newReceipt =  new Receipt(req.body);
            console.log(req.body);
            //await newReceipt.save();
            res.status(200).json(newReceipt);
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
}

// const sold = async (id, quantity, oldSold) => {
//     await Products.findOneAndUpdate({_id: id}, {
//         sold: quantity + oldSold
//     })
// }

module.exports = receiptController;