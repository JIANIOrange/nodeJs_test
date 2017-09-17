var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    cookieParser = require('cookie-parser'),
    regi_add = require('./register'),
    chec_logi = require('./login'),
    messagexx = require('./message'),
    lotteryxx = require('./lottery'),
    dianzan = require('./dianzan');
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.post('/login',function(req,res){
    if(req.query.type == 'register'){
        regi_add(req,function(par){
           res.send(par);     
        });
    }
    if(req.query.type == 'login'){
        chec_logi(req,function(par){
            console.log(par.length);
            if(par.length == 0){
                res.send('0');
                return;
            }
            res.cookie('id',par[0].id,{maxAge:900000});
            res.cookie('name',par[0].username,{maxAge:900000});
            res.send(par);
        })
    }
    if(req.query.type == 'add_message'){
        if(req.cookies.id){
            messagexx.add_message (req,function(par){
                if(par){
                    res.send('1');
                }else{
                    res.send('2');
                }
            })
        }else{
            res.end();
            return; 
        }      
    }
    if(req.query.type == 'like_inc'){
        if(req.cookies.id){
            dianzan(req,function(par){
                res.send(par);
            })
        }else{
            res.end();
            return;
        }
    }
    if(req.query.type == 'lottery'){
        if(req.cookies.id){
            lotteryxx.find_pri(req,function(par){
                res.send(par);
            })
        }else{
            res.end();
            return;
        }     
    }
});
app.get('/login',function(req,res){
    if(req.query.type == 'get_message'){
        if(req.cookies.id){
            messagexx.get_mess(function(par){
                res.send(par);
            })
        }else{
            res.end();
            return;
        }   
    }
    if(req.query.type == 'get_pri_list'){
        if(req.cookies.id){
            lotteryxx.pri_list(function(par){
                res.send(par);
            })
        }else{
            res.end();
            return;
        }      
    }
});
app.listen(8099,function(){
    console.log('o2k');
});

