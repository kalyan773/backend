const database = require('mysql2');

const conn = database.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'demo'
});


const execQuery =function(query){
    return new Promise(function(resolve,reject){
        conn.query(query,function(err,rows,col){
        if(err){
            reject(500);
        }else{
            resolve(rows);
        }
    })
})
}



module.exports = execQuery;