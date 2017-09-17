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
function chec_logi (req,callback){
    var data = {
            username : req.body.username,
            password : req.body.password
    }
    mysql.table('user').where(data).select().then(function (info) {
        callback(info);
    }).catch(function (err) {
        console.log(err);
    })
};
module.exports = chec_logi ;
