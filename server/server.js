const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()

const productsRoute = require('./API/productsRoute')

const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())


app.use("/product",productsRoute)


mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
    console.log("Connected")
})

app.listen(8000,(err)=>{
    if(err) return err
    console.log("Server Running")
})