var express = require('express'),
    app = express(),
    Mysql = require('node-mysql-promise'),
    mysql = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'orange'
});
app.use(express.static('public'));
function lik_inc (req,callback){
    var data = {
        id : req.body.id
    }
    mysql.table('message').where(data).updateInc('lik', 1).then(function (info) {
        mysql.table('price').where({ uid: req.cookies.id }).select().then(function (infom) {
            if (infom.length == 0) {
                mysql.table('price').add({ uid: req.cookies.id,username:req.cookies.name }).then(function (inf) {
                    
                }).catch(function (err) {
                    console .log(err);
                })
            } 
            callback(info);  
        }).catch(function(err){
            console.log(err);
        })
        callback('1');
    }).catch(function (err) {
        console.log(err);
    })
}
module.exports = lik_inc;