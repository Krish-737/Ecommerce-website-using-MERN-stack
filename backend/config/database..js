const mongoose=require('mongoose')


const connectDatabase=()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true

    }).then(con=>{
        console.log(`monogodb is connected ${con.connection.host}`);
    })
}
module.exports=connectDatabase;