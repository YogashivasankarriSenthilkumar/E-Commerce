require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Q8fPeByrVu6wJZ38BJeSILoI7RPBfyJLgi7lI16tuKElD1484IJwCVYFzhGmBNsiZMP1PGsuG3XONapAqjiSAdY00fbVGSUUl");

app.use(cors());  
app.use(express.json());

// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    console.log("Request received at backend:", req.body);
    const {products} = req.body;
    console.log("node : ", products);


    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name,
                images:[product.images]
            },
            unit_amount:product.price * 100,
        },
        quantity:product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel",
    });
    res.json({id:session.id})
})

const start = Date.now();
app.listen(7001, () => {
  console.log("Server started on port 7001");
  console.log(`Server took ${Date.now() - start}ms to start`);
});

app.get("/api/orders", (req, res) => {
    res.json(orders);
});