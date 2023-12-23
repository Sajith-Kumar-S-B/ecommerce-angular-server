const mongoose = require('mongoose')

const connection_string = process.env.DB_CONNECTION_STRING

mongoose.connect(connection_string).then((res)=>{
    console.log("Mongodb connected successfully to Ecommerce_server")
}).catch((error)=>{
    console.log(error);
})