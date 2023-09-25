const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const errorController = require('./controllers/error');
const mongoConnect = require("./util/database").mongoConnect;

// const User = require('./models/user');


const app = express();
app.use(cors());

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => console.log(err));
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoConnect(()=>{
   app.listen(4000 , ()=>{
    console.log("server running on port 4000")
   });
})
