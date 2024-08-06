const product=require('../models/productModel')
const products=require('../data/products.json')
const connectDatabase = require('../config/database.')
const dotenv=require('dotenv')

dotenv.config({path:'backend/config/config.env'})


connectDatabase()
const seed=async ()=>{
    try {
        await product.deleteMany()
        console.log("all products deleted");
        await product.insertMany(products)
        console.log("all products inserted");
        
    } catch (error) {
        console.log(error.message);
        
    }
    process.exit();
    
}
seed();