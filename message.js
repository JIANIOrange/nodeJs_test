var express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    Mysql = require('node-mysql-promise'),
    mysql = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'orange'
});
app.use(express.static('public'));
app.use(cookieParser());
Date.prototype.format =function(format){
    var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(), //day
    "h+" : this.getHours(), //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter
    "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
function get_mess(callback){
    mysql.table('message').select().then(function (info) {
        callback(info);
    }).catch(function (err) {
        console.log(err);
    })
}
function add_message (req,callback){
    var data = { 
        uid : req.cookies.id,
        username : req.cookies.name,
        mess : req.body.mess,
        mtime : new Date().format('yyyy-MM-dd hh:mm')
    }
    mysql.table('message').add(data).then(function (info) {
        mysql.table('price').where({ uid: data.uid }).select().then(function (infom) {
            if(infom.length == 0){
                mysql.table('price').add({uid : data.uid, username : data.username}).then(function(inf){

                }).catch(function(err){
                    console.log(err);
                })
            }
            callback(info); 
        }).catch(function(err){
            console.log(err);
        })
    }).catch(function (err) {
        console.log(err);
    })
}
module.exports = {
    get_mess : get_mess,
    add_message : add_message
}
