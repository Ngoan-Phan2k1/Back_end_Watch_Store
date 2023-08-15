const paypal = require('paypal-rest-sdk');
const request = require('request');
const User = require('../model/user');
const Payments = require('../model/payment');


paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AeuNHU_zjyo4QfdMycktKrkY-x7zXLnqwox204EK9BV0NUnAdG9Ke_o5JLEciRsYvzHtOePldE7di8ZA',
    'client_secret': 'EB-3Qe_A2HUrEzEGja5d0lIzgn7RRXHZXNNSjYz1fviBmxgjsu8UJQYGX_cCoQ8i5h9X4fUkH1WfjwFG',

})





const paypalController = {

    createPayPal: async(req, res) => {
        try{

            const totalUSD = req.params.totalUSD
            const userId = req.params.userId
            // console.log(req.params.price)
           
           
            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": `http://10.0.2.2:8000/v1/paypal_api/success/${totalUSD}/${userId}`,
                    "cancel_url": "http://localhost:8000/cancel"
                },
                "transactions": [{
                    // "item_list": {
                    //     "items": [{
                    //         "name": "item",
                    //         "sku": "item",
                    //         "price": "2.00",
                    //         "currency": "USD",
                    //         "quantity": 2
                    //     }]
                    // },
                    "amount": {
                        "currency": "USD",
                        "total": totalUSD
                    },
                    "description": "This is the payment description."
                }]
            };

            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    console.log(error);
                    res.send("Lỗi khi tạo payment trên PayPal")
                } else {
                    console.log("Create Payment Response");
                    console.log(payment);
                    res.redirect(payment.links[1].href)

                    
                    
                    //res.send("OK")

                    // res.redirect('https://www.sandbox.paypal.com/signout')

                }
            });
        }catch(err){
            return res.status(500).json(err);
        }
    },



    successPayPal: async(req, res) => {
        try{
            
            
            const userId = req.params.userId
            

            // console.log(req.query.PayerID)

            const totalUSD = req.params.totalUSD
            
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;
            let data=null;
            //console.log("payerId", payerId, "paymentId", paymentId)
            const execute_payment_json = {
                "payer_id": payerId,
                "transactions": [{
                    "amount": {
                        "currency":"USD",
                        "total": totalUSD
                    }
                }]
            };


            // const executePayment = (paymentId, execute_payment_json) => {
            //     return new Promise((resolve, reject) => {
            //       paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
            //         if (error) {
            //           reject(error);
            //         } else {
            //           resolve(payment);
            //         }
            //       });
            //     }, 50000);
            //   };
          
            //   const payment = await executePayment(paymentId, execute_payment_json);
            //   console.log("Payment.....:", payment);
            //   res.json(payment)



            paypal.payment.execute(paymentId, execute_payment_json, async function(error, payment) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error });
                } else {
                    // console.log(JSON.stringify(payment));
                    
                    

                    paypal.payment.get(payment.id, async function (error, payment) {
                        if (error) {
                            console.error(JSON.stringify(error));
                            throw error;
                        } else {
                            // Xử lý thông tin về thanh toán
                            const user = await User.findById(userId)
                            const {_id, username, email} = user;

                            const address = {
                                address: {
                                    address_line_1: payment.payer.payer_info.shipping_address.line1,
                                    admin_area_2: payment.payer.payer_info.shipping_address.city,
                                    admin_area_1: payment.payer.payer_info.shipping_address.state,
                                    postal_code: payment.payer.payer_info.shipping_address.postal_code,
                                    country_code: payment.payer.payer_info.shipping_address.country_code

                                },
                                // given_name: order.payer.name.given_name,
                                // surname: order.payer.name.surname,
                                fullname: payment.payer.payer_info.shipping_address.recipient_name,
                                email: payment.payer.payer_info.email,
                            }


                            const newPayment = new Payments({
                                user_id: _id, username, email, cart: user.cart, orderID: payment.cart, address
                           })

                           await newPayment.save();

                            // console.log('Thông tin về thanh toán:');
                            //console.log(JSON.stringify(payment));

                            
                        }
                    });

                    res.send(payment)

                    
                }
            })


            

            // console.log(payment)
            
            
         
        }catch(err){
            console.log("ERR")
            return res.status(500).json(err);
        }
    }
}

module.exports = paypalController;