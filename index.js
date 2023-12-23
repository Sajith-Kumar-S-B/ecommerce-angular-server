require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./DB/connection')
const routes = require('./Routes/router')

const ecommerceServer = express()
ecommerceServer.use(cors())
ecommerceServer.use(express.json())
// ecommerceServer.use(routes)

const PORT = 3000 || process.env.PORT

ecommerceServer.listen(PORT,()=>{
    console.log(`Ecommerce Server started at ${PORT} and waiting for client request !!`)
})


ecommerceServer.get("/",(req,res)=>{
    res.send(`<h1>Ecommerce Server started and waiting for client request !!</h1>`)
})
