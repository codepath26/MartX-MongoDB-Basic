let orderdata = document.getElementById('order-data') 
document.addEventListener('DOMContentLoaded' , adddata);
async function adddata(e){

  let orders = await axios.get('http://localhost:4000/orders');
 let products = orders.data;
//  console.log(products) 


  if(orders.data.length <= 0){
    orderdata.innerHTML = ` <h1>Nothing there!</h1>`
  }
  else{
    products.forEach(order =>{
      orderdata.innerHTML +=` <li class='list-unstyled'><h1> #${order.id} </h1> </li><ul> `
      // console.log(order.products)
      if(order.products.length === 0){
       
      }else{
        let product = order.products;
        product.forEach(item =>{ 
          console.log(item)
          orderdata.innerHTML += ` <li class='list-unstyled'> <h3>${item.title}</h3><h3> ${item.orderItem.quantity}</h3> </li></ul> `})
          
        }
  })


 }

}
      