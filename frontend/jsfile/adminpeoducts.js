let item = document.getElementById('data');
// const deleteButton = document.getElementById('  ')
document.addEventListener('DOMContentLoaded',fetchdata)


async function fetchdata (e){
  console.log("here");
const products = await axios.get('http://localhost:4000/admin/products')
console.log("product gotten")
const items = products.data;
items.forEach(product=> {
  item.innerHTML += `
  <div class="col-md-4 mb-4">
    <div class="card">

      <img src="${product.imageUrl}" class="card-img-top img"  height="300px" width="200px" alt="Product Image">
    
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">$${product.price}</p>
        <div class="d-flex justify-content-between align-items-center">
          <a href="../htmlFile/addproduct.html?id=${product._id}" class="btn btn-sm btn-primary">Edit</a>
          
          <div class="list-delete">
          <input type="hidden" value = ${product._id} name="productId">
          <button class="btn deleteButton">Delete</button>
      </div>
      
        </div>
      </div>
    </div>
  </div>`;  
});
const deletebtn =Array.from(document.querySelectorAll('.list-delete'));
deletebtn.forEach(div=>{
  div.addEventListener("click" , async (e)=>{

    if(e.target.classList.contains('deleteButton')){
      const id = e.target.parentElement.children[0].value;
     const result = await axios.post(`http://localhost:4000/admin/delete-product?productId=${id}`);
     console.log(result)

    }
  })
})
console.log(deletebtn)
}


