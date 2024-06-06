const express = require("express");
const mongoose = require("mongoose");
//import route here
const companyRoute=require('./routes/company.route')
const userRoute=require('./routes/user.route')
const roleRoute = require("./routes/role.route");
const app = express();
//middleware
app.use(express.json());   //we need this line to pass json data through our node js
app.use(express.urlencoded({extended:false}));//this line helps to submit request body as form

//routes
 app.use('/api/companies',companyRoute);
 app.use('/api/users',userRoute);
 app.use('/api/roles',roleRoute);

//request and response
app.get("/", (req, res) => {
  res.send("Hello from node api here!");
});



mongoose
  .connect(
    "mongodb+srv://tm12:tm12@cluster0.xbu8kdb.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database.");
    app.listen(3000, () => {
      console.log("Server is running on port 3000!");
    });

  })
  .catch(() => {
    console.log("Connection failed!");
  });