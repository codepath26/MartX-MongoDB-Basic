let orderdata = document.getElementById('order-data') 
document.addEventListener('DOMContentLoaded' , adddata);
async function adddata(e){

  let orders = await axios.get('http://localhost:4000/orders');
 let products = orders.data;
  if(orders.data.length <= 0){
    orderdata.innerHTML = ` <h1>Nothing there!</h1>`
  }
  else{
    products.forEach(order =>{
      orderdata.innerHTML +=` <li class='list-unstyled'><h1> Order : #${order._id} </h1> </li><ul> `
      if(order.items.length === 0){
       
      }else{
        let items = order.items;
        items.forEach(item =>{ 
     
          orderdata.innerHTML += ` <li class='list-unstyled'> <h3>${item.title}(${item.quantity.quantity})</h3> </li></ul> `})
          
        }
  })


 }

}
      