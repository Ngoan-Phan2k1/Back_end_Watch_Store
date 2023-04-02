const Payments = require('../model/payment');
const Users = require('../model/user');
const Products = require('../model/product');



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

        queryStr = queryStr.replace(/\b(gte|gt|eq|lt|lte|regex)\b/g, match => '$' + match) //se match voi toan tu nhap vao ket qua vi du: $gte
       // console.log({queryObj, queryStr});
        this.query.find(JSON.parse(queryStr)); //trong ket qua lay ra all products lai loc theo 1 lan nua dua tren queryStr
        return this;
    }

}

const paymentController = {
    getPayments: async(req, res) => {
        try{
            // const features = new APIfeatures(Payments.find(), req.query).filltering();
            // const payments = await features.query;
            const payments = await Payments.find();
            res.json(payments);

            // res.json({
            //     result: payments.length,
            //     payments: payments,
            // });
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createPayments: async(req, res) => {
        try{
           const user = await Users.findById(req.user.id).select('username email');

          // console.log("User", user);
           if(!user) return res.status(400).json({msg: "User does not exist."})

           const {cart, orderID, address} = req.body;
           const {_id, username, email} = user;

           const newPayment = new Payments({
                user_id: _id, username, email, cart, orderID, address
           })

           await newPayment.save();
           res.json({newPayment})

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

module.exports = paymentController;