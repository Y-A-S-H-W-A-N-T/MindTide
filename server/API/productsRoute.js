const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Products } = require('../Schema/productsSchema')



router.get('/get-products/:id', async(req,res)=>{
    const { id } = req.params
    try{
        const product = await Products.findOne({_id: id})
        res.status(200).json({msg: "Success",product: product, images: product.images, thumbnail: product.thumbnail})
    }
    catch(err){
        console.log("Error in Fetching Individual Product")
        res.json({status: 404, msg: "Error in Fetching Individual Products"})
    }
})

router.get('/get-products', async(req,res)=>{
    try{
        const products = await Products.find({})
        res.status(200).json({msg: "Success",products: products})
    }
    catch(err){
        console.log("Error in Fetching Product")
        res.json({status: 404, msg: "Error in Fetching Products"})
    }
})


router.post('/add-product', async(req,res)=>{
    try{
        const newProduct = new Products(req.body)
        const product = await newProduct.save()
        res.status(200).send(product)
    }
    catch(err){
        console.log(err)
        res.status(400)
    }
})

router.delete('/delete-product/:id', async(req,res)=>{
    try{
        const response = await Products.deleteOne({_id: req.params.id})
        res.status(200).send(response)
    }
    catch(err){
        console.log(err)
        res.status(400).send()
    }
})

router.put('/update-product/:id',async(req,res)=>{
    try{
        const response = await Products.findByIdAndUpdate(req.params.id, req.body);
        console.log(response)
        res.status(200).send(response)
    }
    catch(err){
        console.log(err)
        res.status(400).send()
    }
})


module.exports = router;