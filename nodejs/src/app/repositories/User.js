
const execQuery = require('../../config/database');

async function getUsers(id){

    let query =`select * from employee`;
       if(id){
        query+=` where emp_id=${id}`;
       } 
       console.log('query',query) 
    let data= await execQuery(query);
    return data;
}
async function getRegisterUsers(id){
    console.log('id',id)
let query = `select * from users`;
if(id){
    query+=` where id=${id}`
}
console.log('query',query)
let data = await execQuery(query);
return data;
}


async function addUser(body){
   let data= await execQuery(`insert into employee (name,dob,phone,email,client_id) values("${body.name}","${body.dob}",${body.phone},"${body.email}",${body.client_id})`);
    return data;
}


async function updateUsers(body){
    // let keyValue = ''
    // let i = 0;
    // console.log('Object.entries(body)',Object.entries(body))
    //  for(let [key,values] of Object.entries(body)){
    //     console.log('keys,values',key,values)
    //     if(!['emp_id','client_id'].includes(key)){
    //         keyValue += (key+'=' +  (key =='phone'? values :`"${values}"`));
    //        ( i < 3 )?  keyValue += ',':''
    //        i++
    //     }
    //     console.log('i',i)
    //  }
    //  console.log('keyVlaue',keyValue)


    let keyValuePairs = [];
    let empId = body.emp_id;

    // Iterate through the object entries
    for (let [key, value] of Object.entries(body)) {
        console.log('keys, values:', key, value);
        if (!['emp_id'].includes(key)) {
            // Prepare the key-value pair for SQL, handling numbers and strings appropriately
            let keyValue = `${key} = ${key === 'phone' ? value : `"${value}"`}`;
            keyValuePairs.push(keyValue);
        }
    }

    // Join key-value pairs with commas
    let keyValueString = keyValuePairs.join(', ');

    console.log('keyValueString:', keyValueString);

    if (!keyValueString || !empId) {
        throw new Error('Invalid input: missing data to update or emp_id');
    }

    let data= await execQuery(`update  employee set ${keyValueString}   where emp_id =${empId}`);
     return data;
 }


 async function deleteUser(body){
   let data  = await execQuery(`delete from employee where emp_id= ${body.emp_id}`)
   return data;

 }

 async function findId(id){
    console.log('id',id)
    let data = await execQuery(`SELECT 1 FROM employee WHERE emp_id = ${id} LIMIT 1`)
    return data;

 }


module.exports = {
    getUsers,addUser,updateUsers,deleteUser,findId,getRegisterUsers
}