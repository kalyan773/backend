const { findId } = require("../repositories/User");
const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey123';

let middleware = {
  find: async function findID(req, res, next) {
    console.log('param',req.params )
    console.log('param',req.body )

    if (req.params.id || req.body.emp_id) {
      console.log("request middleware", req.params);
      // Fetch the ID from request params
      const empId = Number(req.params.id) || Number(req.body.emp_id);

      if (!empId) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      // Fetch all employee IDs from the database
      let result = await findId(empId);
      console.log("Fetched IDs from DB:", result);
      console.log("frghjkl")

      console.log("abccccc");


      console.log('copyyyyy')



      if (result.length === 0) {
        // If ID doesn't exist, respond with an error
        return res.status(404).json({ error: "ID not found" });
      }
      // If ID exists, proceed to the next middleware or controller
      next(); 
    }else{
        // If ID exists, proceed to the next middleware or controller
        next(); 
      
    } 
  },

  token:async function validToken(req, res, next) {
    console.log('request' ,req.body);

    const userToken = req.headers.authorization;
    if(userToken){
      const token = userToken.split(" ")[1];

      jwt.verify(token,secretKey,(err,user)=>{

        console.log('err',err)
        if(err){
          return res.status(403).json({err:'token is not valid'})
        } 

        console.log('user',user);

        next();

      })

    }else{
      return res.status(400).json({message:"token not provided"})
    }
  }
};


module.exports = middleware;
