const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId;
class Product {
  constructor(title,price,description,imageUrl,id,userId){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ?  new ObjectId(id) : null;
    this.userId = userId;
  }
  async save (){
 const db = getDb();

 let dbObj; 
 try{
 if(this._id){
     const id = this._id
     dbObj = await db.collection('products').updateOne({_id :id},{$set:this})    
    console.log(dbObj);
 }
 else
 {
 dbObj =  await db.collection('products').insertOne(this)
 }
}catch(err){
  console.log("err")
  console.log(err)
}

}

  static fetchAll(){
    const db = getDb();
    return db
    .collection('products')
    .find()
    .toArray()
    .then(products=>{
    console.log(products);
    console.log('return product')
    return products;
    })
    .catch((err)=>{
      console.log(err);
    })
  }

static  async findByPk (productId){
  try{

    console.log("this is the findbyPk")
    const db = getDb();
     // .findOne({_id : productId}) // this is not work bro and here is solution
    const product = await db.collection('products').find({_id : new mongodb.ObjectId(productId)}).next()
    console.log(product);
    return product;
  }
catch(err){
  console.log(err);

}
}

static deleteById(productId){
  const db = getDb();
  return db.collection('products').deleteOne({_id : new mongodb.ObjectId(productId)})
  .then(result =>{
    console.log(result);
  })
  .catch(err =>{
    console.log(err);
  })
}


}



module.exports = Product;
