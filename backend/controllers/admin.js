

const Product = require('../models/product');
const mongodb  = require('mongodb');



exports.postAddProduct = async (req, res, next) => {
  console.log("this is the  first thing which handle")
  console.log(req.body)
  try {
    const { title, imageUrl, price, description } = req.body;

   const product = new Product (title , price , description , imageUrl);
   console.log(product)
   product.save();
    res.status(201).json({message : "itemadded successfully"})
  } catch (err) {

   res.status(500).json({err : "internal server error"})
  }
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    console.log(prodId);
    const product = await Product.findByPk(prodId);
    console.log("return product")
    res.status(201).json(product)
  }
   catch (err) {
    console.log(err)
       res.status(500).json({err : 'intenal server error'});
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    console.log("this is the pprodId");
    const prodId = req.body.productId;
    console.log(prodId)
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    
 const product = new Product(updatedTitle,updatedPrice, updatedDesc,updatedImageUrl,prodId);
 const result = await product.save()
   console.log("UPDATED PRODUCT!");
   res.status(200).json("This is updated");
  } catch (err) {
      res.status(500).json({err : 'intenal server error'})
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    let products = await Product.fetchAll();
    res.status(201).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'internal server error' });
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  console.log("I am here bro")
  try {
    const prodId = req.query.productId;
    console.log(prodId)
     const result = await Product.deleteById(prodId)
     console.log(result);
       res.status(200).json({messge : "Deleted Successfully"});
      
      } catch (err) {
      res.status(500).json({err : 'intenal server error'})
  }
};
