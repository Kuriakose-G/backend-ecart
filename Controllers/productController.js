// logic to resolve


// get all products

// import products collection
const products=require('../model/productSchema')

// get all products
exports.getallproducts=async (req,res)=>{
    try{
        // get all products from products colection in mongodb
        const allProducts=await products.find()
        res.status(200).json(allProducts) //response send back to the client
    }
    catch(err){
        res.status(401).json(err) //error sending back to the client
    }
}

// view particular product details
exports.viewproducts=async(req,res)=>{
    // logic
    // get particular id
    const id=req.params.id
    // get details of particular product
    try{
        const product=await products.findOne({id})
        if(product){
            res.status(200).json(product)
        }else{
            res.status(401).json('Product not found') //error sending back
        }
    }
    catch(err){
        res.status(401).json(err) //error sending back to the client
    }
}

