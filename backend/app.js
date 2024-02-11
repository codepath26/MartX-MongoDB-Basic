const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const errorController = require('./controllers/error');
const mongoConnect = require("./util/database").mongoConnect;
const User = require('./models/user');
const PORT = process.env.PORT


const app = express();
app.use(cors());

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findByPk('6512d63a89c88275712492df')
    .then(user => {
      console.log("user" ,user);
      req.user = new  User(user.name , user.email , user.cart , user._id);
      console.log('user created',req.user)
      next();
    })
    .catch(err => console.log(err));

});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
// app.use((req,res)=>{
//   console.log(req.url)
//   if(req.url === '/'){
//     res.sendFile(path.join(__dirname , `public/index.html`))
//   }else{
//     console.log(path.join(__dirname , `public/${req.url}`))
//     res.sendFile(path.join(__dirname,`public/${req.url}`))
//   }
// })

// app.use(errorController.get404);
mongoConnect(()=>{
   app.listen(PORT , ()=>{
    console.log(`server running on port ${PORT}`)
   });
})
