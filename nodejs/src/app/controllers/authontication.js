
const sqlQuerty = require('../../config/database')

const bycrpt = require('bcrypt');

const jwttoken = require('jsonwebtoken');


const secretKey = 'mysecretkey123';

let authController = {
signup: async(req,res)=>{
   let reqEmail = req.body.email 
   const {name,email,password,passwordConfirm} = req.body
   try{

   let emailRes =   await sqlQuerty(`select email from users where email='${reqEmail}'`)

   
   if(emailRes.length>0){ 
    return res
        .status(400)
        .json({ error: true, message: "Email already exists" });
        
   }else if(password !== passwordConfirm){
    return res
    .status( 400)
    .json({ error: true, message: "Confirm Password doesn't match " });
   }else {

    let passwordencryp = await bycrpt.hash(password,8)

    console.log(' req.body', req.body);
    console.log('passwordencryp',passwordencryp)
    console.log('name,email,password,passwordConfirm',name,email,password,passwordConfirm)
    let userSignup = sqlQuerty(`insert into users (name,email,password) values ("${name}","${email}","${passwordencryp}")`)
    userSignup.then((rows)=>{

        console.log('rowssssssssss',rows)
        return res
        .status(200)
        .json({ message: "User Inserted Sucessfully" });
       
    })
   }
}catch(e){
    console.log("eeeeeeeee",e)
}


   
},

login:async (req,res)=>{
    let reqEmail = req.body.email;
    try{

        let emailRes =   await sqlQuerty(`select email from users where email='${reqEmail}'`)

        
        if(emailRes.length==0){ 
         return res
             .status(400)
             .json({ error: true, message: "Email not exists, Please register first!" });
             
        }else{
            let password = await sqlQuerty(`select password from users where email='${reqEmail}'`)
            // let passwordencryp = await bycrpt.hash(req.body.password,8)

            // if(password[0].password === passwordencryp){
            //     console.log('login sucess')

            //     return res.status(200)
            // }


            const match = await bycrpt.compare(req.body.password, password[0].password);

               if(match){
                console.log('login sucess');
              let user = await sqlQuerty(`select id,name,email from users where email ='${reqEmail}'`);
                  console.log("user",user);
                  console.log("secretKey",secretKey)
                const accessToken = jwttoken.sign(user[0],secretKey);

                return res.status(200).json({user:user[0],accessToken, message: "Login sucessfull" })
            }else{
                return res.status(401).json({ message: "User crential not matched" })

            }
        }
    }catch(e){
        console.log('eeee1234',e)
    }
    

}



}

module.exports = authController;