

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  console.log(req.body.title)
  try {
    const { title, imageUrl, price, description } = req.body;

    await req.user.createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    });
    res.status(201).json({message : "itemadded successfully"})
  } catch (err) {

   res.status(500).json({err : "internal server error"})
  }
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    
    const prodId = req.params.productId;
    const products = await req.user.getProducts({ where: { id: prodId } });
    const product = products[0];

    if (!product) {
      return res.redirect('/');
    }

    res.satus(201).json(product)
  } catch (err) {
       res.status(500).json({err : 'intenal server error'})
  
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const product = await Product.findByPk(prodId);
    if (!product) {
      return res.redirect('/');
    }

    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    await product.save();
    res.redirect('/admin/products');
  } catch (err) {
      res.status(500).json({err : 'intenal server error'})
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    let products = await req.user.getProducts();
    res.status(201).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'internal server error' });
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const product = await Product.findByPk(prodId);
    if (product) {
      await product.destroy();
    }
    res.redirect('/admin/products');
  } catch (err) {
     res.status(500).json({err : 'intenal server error'})
  }
};
