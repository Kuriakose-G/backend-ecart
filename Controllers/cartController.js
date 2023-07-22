const carts = require("../model/cartSchema");

// add to cart
exports.addtocart = async (req, res) => {
  // get product details from req object
  const { id, title, price, image, quantity } = req.body;

  try {
    // check if product is already in cart then update the quantity and price
    const product = await carts.findOne({ id });
    if (product) {
      // if product is already in the car, increment the quantity
      product.quantity += 1;
      // update grand total
      product.grandTotal = product.price * product.quantity;
      // save the changes into the db
      product.save();
      // send response back to client
      res.status(200).json("Item updated...");
    } else {
      // else add to cart if product is not in it
      const newProduct = new carts({
        id,
        title,
        price,
        image,
        quantity,
        grandTotal: price,
      });
      // save the new product
      await newProduct.save();
      // response send back to the client
      res.status(200).json("Item added to your cart");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// get cart
exports.getcart = async (req, res) => {
  try {
    const allcart = await carts.find();
    res.status(200).json(allcart);
  } catch (error) {
    res.status(404).json(error);
  }
};

// cart delete
exports.delete = async (req, res) => {
  // remove cart items
  // get product id from parameter
  const { id } = req.params;
  try {
    const removecartitems = await carts.deleteOne({ id });
    if (removecartitems.deleteCount != 0) {
      // get all cart item after removing particular cart item
      const allcartItems = await carts.find();
      res.status(200).json(allcartItems);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

// increment cart items
exports.incrementCartItems = async (req, res) => {
  // get product id from request
  const { id } = req.params;
  try {
    //check if product is in the cart
    const product = await carts.findOne({ id });
    if (product) {
      //update the quantity and grand total
      product.quantity += 1;
      product.grandTotal = product.quantity * product.price;
      //save changes to the db
      await product.save();
      //updated details send back to the client
      const allcart = await carts.find();
      res.status(200).json(allcart);
    } else {
      res.status(404).json("product not found");
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

// decrement cart items
exports.decrementCartItems = async (req, res) => {
  const { id } = req.params;
  try {
    //check if product is in the cart
    const product = await carts.findOne({ id });
    if (product) {

      //update the quantity and grand total
      product.quantity -= 1;
      if (product.quantity == 0) {
        const removecartitems = await carts.deleteOne({ id });
        const allcartItems = await carts.find();
      res.status(200).json(allcartItems);
      } else {
        product.grandTotal = product.quantity * product.price;
        //save changes to the db
        await product.save();
        //updated details send back to the client
        const allcartItems = await carts.find();
        res.status(200).json(allcartItems);
      }

    } else {
      res.status(404).json("product not found");
    }
  } catch (error) {
    res.status(404).json(error);
  }
};
