const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(name , email ,cart,id){
    this.name = name ;
    this.email= email;
    this.cart = cart;
    this._id = id;
  }
  save(){
    const db  = getDb();
   db.collection('users').inserOne(this);
  };

  async addToCart(product){
    const cartprductIndex  = this.cart.items.findIndex(cp =>{
      console.log(cp)
      console.log(typeof cp.productId)
      console.log(typeof product._id)
      return cp.productId.toString() === product._id.toString();
    });
    try{
    let newQuantity = 1;
    console.log(cartprductIndex);
    const updatedCartItems = [...this.cart.items];

    if(cartprductIndex >= 0){
    newQuantity = this.cart.items[cartprductIndex].quantity + 1;
    updatedCartItems[cartprductIndex].quantity = newQuantity 
    }else{
      updatedCartItems.push({productId : new ObjectId(product._id),
        quantity : newQuantity
      });
    }
   

      console.log("this is add to cart")
      const updatedCart = {items :updatedCartItems}; 
      // At this time we store the all product which is hardcoded bro so that we need to add onlu refrence to that perticuler product not holl product
      const db = getDb();
      console.log(this);
      return db.collection("users").updateOne(
        {_id : this._id},
        {$set : {cart : updatedCart}});
      }catch(err){
        console.log(err);
      }
    }



 static  async findByPk(userId){
  try{

    console.log("at here")
    const db = getDb();
    //  return db.collection('users').find({_id : new ObjectId(userId)}).next();
    console.log(new ObjectId(userId))
   const user = await db.collection('users').findOne({_id : new ObjectId(userId)});
   console.log(user);
   return user;
  }catch(err){
    console.log(err);
  }
  }

  async getCart(){
    // return this.cart;
    try{

      const db =getDb();
      const productIds =await this.cart.items.map((i)=>{
        return i.productId;
      })
      const products = await db.collection("products").find({_id : {$in :productIds}}).toArray();
       const newproducts =  products.map(data=>{
          return {...data ,
             quantity : this.cart.items.find(i =>{
              return i.productId.toString() === data._id.toString();
             })
            }
        })
        return newproducts;
    }catch(err){
      console.log(err);
    }
  }
  async deleteItemFromcart (productId){
    try{
      const updatedCartItems = this.cart.items.filter(item =>{
        return item.productId.toString() !== productId.toString();
      });
      const db = getDb();
      const updateditem = await db.collection('users').updateOne({_id : new ObjectId(this._id)},{$set  : {
        cart : {items : updatedCartItems}
      }});
      console.log(updateditem);
      return updateditem;
    }catch(err){
      console.log(err);
    }
  }
  async addOrder(){
    try{
    const db = getDb();
    const products = await this.getCart();

      const order = {
        items : products,
        user : {
          _id : new  ObjectId(this._id),
          name : this.name,
        }
      };
      const result = await db.collection('orders').insertOne(order)
      console.log(result);
      this.cart = {items : []}
      console.log(this.cart);
      const updateditem = await db.collection('users').updateOne({_id : new ObjectId(this._id)},{$set  : {
        cart : {items : []}
      }});
      console.log(updateditem);
      return result;
    }catch(err){
      console.log(err)
    }
  }
  async getOders(){
  try{

    const db = getDb();
    const orders =await db.collection('orders').find({'user._id' : new ObjectId(this._id)}).toArray();
    return orders;
  }catch(err){
    console.log(err);
  }
  }
}

module.exports = User;