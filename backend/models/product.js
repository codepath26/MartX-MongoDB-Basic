const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId;
class Product {
  constructor(title,price,description,imageUrl,id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ?  new ObjectId(id) : null;
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
    return products;
    })
    .catch((err)=>{
      console.log(err);
    })
  }

static findByPk (productId){
const db = getDb();
return db
.collection('products')
// .findOne({_id : productId}) // this is not work bro and here is solution
.find({_id : new mongodb.ObjectId(productId)})
.next()
.then(product =>{
  console.log(product)
  return product;
})
.catch((err)=>{
  console.log(err);
})
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
