const router = require("express").Router();
const cloudinary = require("cloudinary");
const middlewareController = require("../controllers/middlewareController");
const fs = require("fs");

cloudinary.config({
    cloud_name: 'dljhlsbzb',
    api_key: '448318795377437',
    api_secret: '59RqVNHlVbhen8_O9xrU_p1nAy0',
})

//Upload image
router.post("/upload", middlewareController.verifyTokenAndAdminAuth,(req, res) => {

    try{
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send("No file were uploaded.");
        
        const file = req.files.file;
        // //console.log(file.size);
        //console.log(file)
        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath);
            return res.status(400).json("size too lage");
        }
            

        
        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "watchstore"}, async(err, result) => {
            if(err) throw err;
            removeTmp(file.tempFilePath);
            res.json({public_id: result.public_id, url: result.secure_url});
        })
        
    } catch(err){
        res.status(500).json(err);
    }
})

router.post("/destroy", middlewareController.verifyTokenAndAdminAuth,(req, res) => {
    try{
        const {public_id} = req.body;
        if(!public_id) res.status(400).json("No images selected");
        cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if(err) throw err;
            res.json("Delete image successfully");
        })
    } catch (err) {
        res.status(500).json(err);
    }
})


const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}

module.exports = router;