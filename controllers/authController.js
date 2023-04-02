const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { json } = require("body-parser");

let refreshTokens = [];
const authController = {
    //REGISTER
    registerUser: async(req, res) => {
        try{
            const existusername = await User.findOne({username: req.body.username});
            if(existusername){
                //return res.status(400).json({status: false ,message: "User does not exist."});

                return res.json({
                    status: false,
                    message: "Username already exist"
                });

            }

            const existemail = await User.findOne({email: req.body.email});
            if(existemail){
                //return res.status(400).json({status: false ,message: "User does not exist."});

                return res.json({
                    status: false,
                    message: "Email already exist"
                });


            }


            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                bookmark: req.body.bookmark,
                password: hashed,
            });

            

            //Save to database
            const user = await newUser.save();
            res.status(200).json(user);


        } catch(err) {
            res.status(500).json(err);
        }
    },


    //GENERATE ACCESS TOKEN
    createAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "1d"}
        );
    },

    //GENERATE REFRESH TOKEN
    createRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_REFRESH_KEY,
            {expiresIn: "365d"}
        );
    },



    //LOGIN
    loginUser: async(req, res) => {
        try{
            const user = await User.findOne({username: req.body.username});
            if(!user){
                //res.status(404).json("wrong username");

                return res.json({
                    status: false,
                    message: "wrong username"
                });
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(!validPassword){
                //res.status(404).json("wrong password");

                return res.json({
                    status: false,
                    message: "wrong password"
                });
            }
            if(user && validPassword){
                const accessToken = authController.createAccessToken(user);
                const refreshToken = authController.createRefreshToken(user);
                refreshTokens.push(refreshToken);

                // console.log("refreshToken login user", refreshToken);

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path:"/",
                    sameSite: "strict",
                })

                const { password, ...others } = user._doc;
                res.status(200).json({...others, accessToken, refreshToken});
            }

            
        } catch(err) {
            res.status(500).json(err);
        }
    },

    requestRefreshToken: async(req, res) => {
        //Take refresh token from user
        //const refreshToken = req.cookies.refreshToken;
        const refreshToken = req.headers.token;
        //console.log("reftoken ", refreshToken);

        //console.log("refreshToken requestredreshToken user", refreshToken);

        if(!refreshToken) return res.status(401).json("You're not authenticated");
        
        // if(!refreshTokens.includes(refreshToken)) {
        //     return res.status(403).json("Refresh token is not valid");
        // }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user)=>{
            if(err)
                console.log(err);
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
         
            //Create new Accesstoken, refreshtoken
            const newAccessToken = authController.createAccessToken(user);
            const newRefreshToken = authController.createRefreshToken(user);
            refreshTokens.push(newRefreshToken); 

            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path:"/",
                sameSite: "strict",
            })
            res.status(200).json({accessToken: newAccessToken, refreshToken: newRefreshToken});
        })

    },


    userLogout: async(req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logged out succesfully");
    }

}

module.exports = authController;