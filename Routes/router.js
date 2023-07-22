// To define routes for the client request

// import express
const express=require('express')

// import product controller
const productController=require('../Controllers/productController')

const wishlistController=require('../Controllers/wishlistController')

const cartController=require('../Controllers/cartController')

// using express create an object for router class inorder to setup path
const router=new express.Router();

// resolve various client request

// api call

//1 get all products
router.get('/products/allProducts',productController.getallproducts)

//2 view particular product details
router.get('/products/viewProduct/:id',productController.viewproducts)

//3 to add products to wishlist
router.post('/products/addtowishlist',wishlistController.addtowishlist)

//4 to view products in wishlist
router.get('/products/getwishlist',wishlistController.getwishlist)

//5 to remove product from wishlist
router.delete('/products/deletewishlist/:id',wishlistController.deletewishlist)

//6 to add to cart
router.post('/products/addtocart',cartController.addtocart)

//7 to view products in cart
router.get('/products/getcart',cartController.getcart)

//8 Delete cart product
router.delete('/products/deletecart/:id',cartController.delete)

//9 increment cart count
router.get('/products/increment/:id',cartController.incrementCartItems)

//10 decrement cart count
router.get('/products/decrement/:id',cartController.decrementCartItems)


// export router
module.exports=router