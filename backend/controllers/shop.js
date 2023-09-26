const { response } = require('express');
const Product = require('../models/product');

exports.getProducts =async(req, res, next) => {
  try{  
    let products = await Product.fetchAll()
    res.status(201).json(products);
  }
  catch(err)
  {res.status(500).json({err : "internal sever erro"})}
}
exports.getProduct = async(req, res, next) => {
  try{
    const prodId =req.params.productId;
    console.log(prodId)
       let product =  await  Product.findByPk(prodId)
       res.status(201).json(product);
    
  }catch(err){
    res.status(500).json({err : "internal sever erro"})
  }
   
};

exports.getIndex = async(req, res, next) => {
  try{
  let products = await Product.fetchAll()
   res.status(201).json(products)
  }catch(err){
    res.status(500).json({err : "internal sever erro"})
  }  
};

exports.getCart = async (req, res, next) => {
  try{
    console.log("at get cart method")
    let products = await req.user.getCart();
    console.log("END get cart method")
    res.status(201).json(products);
  }catch(err){
    res.status(500).json({err : "internal sever erro"})
  } 
};




exports.postCart = async (req, res, next) => {
  try {
    console.log("at postCart method");
    const prodId = req.body.productId;
   const product = await Product.findByPk(prodId);
   console.log("product ===>",product)
   console.log("this user",req.user)
 const result =await  req.user.addToCart(product);
  console.log("result",result)
    res.status(200).json({message : "done with cart"})
   
  } catch(err){
    res.status(500).json({err : "internal sever erro"})
  } 
};

exports.postCartDeleteProduct =async (req, res, next) => {
  try{
      console.log(req.body.productId)
    const prodId = req.body.productId;
     const result = await req.user.deleteItemFromcart(prodId)
     res.status(201).json("Item Deleted successfully")
      }
  catch(err){
    res.status(500).json({err : "internal sever erro"})
  } 

    
};


exports.postOrder = async (req, res, next) => {
  try {
    console.log("at post order")
    const result = await req.user.addOrder()
    console.log(result);
  res.status(200).json({message : "productremove success"})
  } catch (error) {
    res.status(500).json({err : "internal sever erro"})
    
  }
};


exports.getOrderslist = async (req, res, next) => {
  try {

    const orders = await req.user.getOders();
    // console.log('this isthe filnal order')
    // console.log(typeof orders);
   res.status(201).json(orders);
  }catch(err){
    res.status(500).json({err : "internal sever erro"})
  }
  
}





















