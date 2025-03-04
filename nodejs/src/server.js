const express = require("express");
const middleware = require('./app/midlewares/findId')
const dotenv = require('dotenv');
const UserController = require("./app/controllers/UserController");
const authetication = require("./app/controllers/authontication")

const app = express();
app.use(express.json())
dotenv.config();
app.listen(4500, () => {
  console.log("server started in 4500");
});
app.post('/signup',authetication.signup)
app.post('/login',authetication.login)
app.get('/users/:id?',middleware.token,middleware.find,UserController.getUsers);
app.get('/registerdusers/:id?',middleware.token,UserController.getregisteredUsers);
app.post('/user',middleware.token,UserController.addUser);
app.put('/user',middleware.token,middleware.find,UserController.updateUser);
app.delete('/user',middleware.token,middleware.find,UserController.deleteUser);
