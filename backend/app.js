const express=require('express')
const app=express();
const errormiddleware=require('./middleware/error')
const products=require('./routes/product');
const user = require('./routes/user');
const order = require('./routes/order');
const payment = require('./routes/payment');
const cookiepaser =require('cookie-parser')
const path=require('path')
const dotenv=require('dotenv')
const bodyParser=require('body-parser')
const cors=require('cors')


dotenv.config({path:path.join(__dirname,'config/config.env')});

app.use('/uploads',express.static(path.join( __dirname,'uploads')))
app.use(express.json());
app.use(cookiepaser());
app.use('/api/v1/',products)
app.use('/api/v1/',user)
app.use('/api/v1/',order)
app.use(bodyParser.json())
app.use(cors())
app.use('/api/v1',payment)
app.use(errormiddleware)

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
    })
}

module.exports=app;