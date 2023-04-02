const User = require("../model/user");
const Payment = require("../model/payment");

const userController = {
    //GET ALL USERS
    getAllUsers: async(req, res) => {
        try{
            const user = await User.find();
            res.status(200).json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getOneUser: async(req, res) => {
        try{
            const user = await User.findById(req.user.id).select('-password').populate("bookmark");
            //if(!user) return res.status(400).json({msg: "User does not exist."});
            res.status(200).json(user);
        } catch(err){
            res.status(500).json(err);
        }
    },

    //DELETE USER
    deleteUser: async(req, res) => {
        try{
            const user = await User.findById(req.params.id);
            res.status(200).json("Delete successfully");
        }catch(err){
            res.status(500).json(err);
        }
    },

    //ADD CART
    addCart: async (req, res) => {
        try{
            const user = await User.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."});

            const newcartUser = await User.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            //return res.json({msg: "Added to cart"});


            return res.json({
                status: true,
                message: "Cart Added Successfully",
                cart: req.body.cart
            });


        } catch(err) {
            return res.status(500).json(err);
        }
    },


    //ADD CART
    addBookmark: async (req, res) => {
        try{
            const user = await User.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."});

            const newbookmarkUser = await User.findOneAndUpdate({_id: req.user.id}, {
                bookmark: req.body.bookmark
            })

            //return res.json({msg: "Added to cart"});


            return res.json({
                status: true,
                message: "Bookmark Added Successfully",
                bookmark: req.body.bookmark
            });


        } catch(err) {
            return res.status(500).json(err);
        }
    },


    getHistory: async (req, res) => {
        try{
            const history = await Payment.find({user_id: req.user.id});
            res.json(history);
        } catch(err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = userController;