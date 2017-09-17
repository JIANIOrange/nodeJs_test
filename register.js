var express = require('express'),
    app = express(),
    Mysql = require('node-mysql-promise');
    mysql = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'orange'
});
app.use(express.static('public'));
function regi_add (req,callback){
    var data = {
            username : req.body.username,
            password : req.body.password
    }
    mysql.table('user').where(data).select().then(function (res) {
        if (res.length == 0) {
            mysql.table('user').add(data).then(function (info) {
                callback('1');
            }).catch(function (err) {
                callback('2');
            })
        }
        else {
            callback('0');
        }
    }).catch(function (err) {
        console.log(err);
    })
}
module.exports = regi_add;
