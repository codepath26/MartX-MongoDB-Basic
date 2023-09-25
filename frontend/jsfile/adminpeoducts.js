let item = document.getElementById('data');

document.addEventListener('DOMContentLoaded',fetchdata)


async function fetchdata (e){
const products = await axios.get('http://localhost:4000')

const items = products.data;
items.forEach(product=> {
  item.innerHTML += `
  <div class="col-md-4 mb-4">
    <div class="card">
      <img src="${product.imageUrl}" class="card-img-top" alt="Product Image">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">$${product.price.toFixed(2)}</p>
        <div class="d-flex justify-content-between align-items-center">
          <a href="../htmlFile/products.html" class="btn btn-sm btn-primary">View Details</a>
          <a href="../htmlFile/cart.html"  class="btn btn-sm btn-outline-secondary">Add TO Cart</a>
          <input type="hidden" id="productId" name="productId" value = ${product.id}>
      
        </div>
      </div>
    </div>
  </div>`;
  
});

}

