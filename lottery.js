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
function find_pri(req,callback){
    var data={
        uid : req.cookies.id
    }
    mysql.table('price').where(data).select().then(function (info) {
        if(info.length == 0){
            callback('0');
        }else if (info[0].price == ''){
            var ran = Math.floor(Math.random() * 4),
                pri = '';
            switch (ran) {
                case 1:
                    price = '一等奖';
                    break;
                case 2:
                    price = '二等奖';
                    break;
                case 3:
                    price = '三等奖';
                    break;
                default:
                    price = '很遗憾';
                    break;
            }
            mysql.table('price').where(data).update({price:price}).then(function(infom){
                callback(price);
            }).catch(function(err){
                console.log(err);
            })
        }else{
             callback(info[0].price);
        }
    }).catch(function (err) {
        console.log(err);
    })
}
function pri_list(callback){
    mysql.table('price').select().then(function(info){
        callback(info);
    }).catch(function(err){
        console.log(err);
    })
}
module.exports = {
    pri_list : pri_list,
    find_pri : find_pri
};