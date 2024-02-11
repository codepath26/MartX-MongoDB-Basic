let item = document.getElementById('data');
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log(productId);
document.addEventListener('DOMContentLoaded',fetchdata)
async function fetchdata (e){
const product1 = await axios.get(`http://localhost:4000/products/${productId}`)
console.log(product1)
const product = product1.data;
  item.innerHTML = `
  
  <div class="container d-flex flex-column align-items-center">
  <div class="title w-100 text-center">
    <h1>${product.title}</h1>
    <hr>
  </div>

  <div class="row d-flex justify-content-center">
    <div class="col-6">
      <img src="${product.imageUrl}"  class="img-fluid"  alt="image" style=" width: 1000px; 
      object-fit: cover;">
    </div>
  </div>
  <h2><b>Price :</b>${product.price}</h2>
  <div class="description">
   <p>${product.description}</p>
  </div>
</div>`


}

