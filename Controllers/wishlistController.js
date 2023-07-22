// import wishlist collection
const wishlists=require('../model/wishlistSchema')

// logic for wishlist
exports.addtowishlist=async(req,res)=>{

    const {id,title,price,image}=req.body
try{
    // check if product is already in wishlist
    const item = await wishlists.findOne({id})
    if(item){
        res.status(401).json("Item already in wishlist")
    }else{
        // product is added to wishlist
        const newProduct=await wishlists({id,title,price,image})
        // to store in db
        await newProduct.save()
        res.status(200).json('Item added to wishlist') //response back to client
    }
}
catch(error){
    res.status(404).json(error)
}
}

// get all products from wishlist
exports.getwishlist=async(req,res)=>{
    try{
        const allwishlist=await wishlists.find()
        res.status(200).json(allwishlist)
    }
    catch(error){
        res.status(404).json(error)
    }
}

// to delete product from wishlist
exports.deletewishlist=async(req,res)=>{
    // get particular product id
    const{id}=req.params
    try{
        const removewishlist=await wishlists.deleteOne({id})
        if(removewishlist){
            // get all wishlist products after removing a particular product
            const remainingwishlist=await wishlists.find()
            res.status(200).json(remainingwishlist)
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}