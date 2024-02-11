let Title = document.getElementById('title')
let ImageUrl = document.getElementById('imageUrl')
let Price= document.getElementById('price')
let Description= document.getElementById('description')
let form = document.getElementById('form-data')
let addbtn = document.getElementById('addbtn')
let updatebtn = document.getElementById('updatebtn')
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
updatebtn.style.display = "none"




// form.addEventListener('submit', adddata);
addbtn.addEventListener('click' , adddata);
updatebtn.addEventListener('click' , updatedata);





window.addEventListener('DOMContentLoaded' , fetchProductdetails);
async function fetchProductdetails (){
  if(productId){
    try{
       updatebtn.style.display = "block"
       addbtn.style.display = "none"
      const product = await axios.get(`http://localhost:4000/admin/edit-product/${productId}`);
             Title.value = product.data.title
             ImageUrl.value = product.data.imageUrl 
             Price.value = product.data.price 
             Description.value = product.data.description
    }catch(err){
      console.log(err);
    }
  }else{
    console.log("hellow");
  }
}


// async function adddata (e){
//   console.log(Title.value)
//   e.preventDefault();
//   console.log(e.target.querySelectorAll("button"))
//   let obj = {
//     title: Title.value,
//     imageUrl: ImageUrl.value,
//     price: Price.value,
//     description: Description.value,
//     }
//     try{
//       let product = await axios.post('http://localhost:4000/admin/add-product',obj);
//       window.location.href ="../htmlFile/adminproducts.html"
//     }catch(err){
//       console.log(err)
//     }
// }


async function adddata (e){
  e.preventDefault();
  console.log(e.target);
  
      let obj = {
        title: Title.value,
        imageUrl: ImageUrl.value,
        price: Price.value,
        description: Description.value,
        }
        try
        {
           let product = await axios.post('http://localhost:4000/admin/add-product',obj);
           console.log(product);
           window.location.href ="../htmlFile/adminproducts.html"

        }
        catch(err)
        {
          console.log(err)
        }
}

async function updatedata (e){

  console.log(e.target);
  
      let obj = {
        productId :productId ,
        title: Title.value,
        imageUrl: ImageUrl.value,
        price: Price.value,
        description: Description.value,
        }
        try
        {
           let product = await axios.post('http://localhost:4000/admin/edit-product',obj);
           window.location.href ="../htmlFile/adminproducts.html"

        }
        catch(err)
        {
          console.log(err)
        }
}