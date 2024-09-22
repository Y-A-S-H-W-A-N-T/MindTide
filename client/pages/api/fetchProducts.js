import { Products } from "@/schema/productsSchema"
import connect from "../../mongodb"

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'GET') {
        await connect()
        try{
            const products = await Products.find({})
            res.status(200).json({msg: "Success",products: products})
        }
        catch(err){
            console.log("Error in Fetching Product")
            res.json({status: 404, msg: "Error in Fetching Products"})
        }
    } else {
        res.setHeader('Allow', ['GET']);
    }
}