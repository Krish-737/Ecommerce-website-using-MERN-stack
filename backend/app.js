const express=require('express')
const app=express();
const errormiddleware=require('./middleware/error')
const products=require('./routes/product');
const user = require('./routes/user');
const order = require('./routes/order');
const cookiepaser =require('cookie-parser')


app.use(express.json());
app.use(cookiepaser());
app.use('/api/v1/',products)
app.use('/api/v1/',user)
app.use('/api/v1/',order)
app.use(errormiddleware)

module.exports=app;