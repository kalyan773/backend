const {
  getUsers,
  addUser,
  updateUsers,
  deleteUser,
  getRegisterUsers
} = require("../repositories/User");

let UserController = {

  getUsers: async (req, res) => {
    try {
      console.log("get method called+++++++++++outside");
      let users = await getUsers(req.params.id);
      return res.send(users);
    } catch (e) {
      return res
        .status(e.statusCode ?? 500)
        .json({ error: true, message: e.message ?? "Something went wrong." });
    }
  },

  getregisteredUsers: async(req,res)=>{
    console.log("response",req.params)
    try{
     let registeredUsers = await getRegisterUsers(req.params.id);
     return res.send(registeredUsers);
    }catch(e){
      return res
        .status(e.statusCode??  500)
        .json({ error: true, message: e.message ?? "Something went wrong." });
    }
  },

  addUser: async (req, res) => {
    await addUser(req.body);
    return res.send("sucessfully posted");
  },

  updateUser: async (req, res) => {
    await updateUsers(req.body);
    return res.send("put called");
  },

  deleteUser: async (req, res) => {
    console.log('ressss',)
    try {
        await deleteUser(req.body);
        return res.send(`${req.body.emp_id} User sucessfully deleted`);
    } catch (e) {
      return res
        .status(e.statusCode ?? 400)
        .json({ error: true, message: e.message ?? "Something went wrong." });
    }
  },
};

module.exports = UserController;
