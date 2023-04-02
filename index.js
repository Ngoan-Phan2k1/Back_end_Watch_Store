const express = require("express")
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const db = require("./config/db")
const sanphamRoute = require("./routes/sanpham");
const productRoute = require("./routes/product");
const loaiRoute = require("./routes/loaisanpham");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const uploadRoute = require("./routes/upload");
const paymentRoute = require("./routes/payment");
const warehouseRoute = require("./routes/warehouse");
const receiptRoute = require("./routes/receipt");
const paypalRoute = require("./routes/paypal");

dotenv.config();

// mongoose.connect((process.env.MONGODB_URL), () => {
//     console.log("Connected to MongoDB");
// });


// mongoose.connect('mongodb://127.0.0.1:27017/data_watchstore', function(err) {
//     if (err) throw err;
//     else{
//         console.log("OK");
//     }
// });

db.connect();


app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true
}));



app.use(morgan("common"));



//AUTHENTICATION

//ROUTES
app.use("/v1/sanpham", sanphamRoute);
app.use("/v1/loai", loaiRoute);
app.use("/v1/category", categoryRoute);
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/admin", uploadRoute);
app.use("/v2/product", productRoute);
app.use("/v1/payment", paymentRoute);
app.use("/v1/warehouse", warehouseRoute);
app.use("/v1/receipt", receiptRoute);
app.use("/v1/paypal_api", paypalRoute);





const port=8000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
