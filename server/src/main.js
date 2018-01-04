import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import logger from 'morgan';
import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import connectMongo from 'connect-mongo';


import cookieParser from 'cookie-parser';

import api from './routes';

// import listen from 'socket.io';


const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("Connected To MongoDB Server");
})

const connect = mongoose.connect('mongodb://127.0.0.1:27017/mall');
autoIncrement.initialize(mongoose.connection);

const app = express();

let port = 8080;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

const MongoStore = connectMongo(session);

const sessionMiddleWare = session({
    name : 'mall_cookie',
    secret : 'mall',
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 2000 * 60 * 60
    },
    store: new (require("connect-mongo")(session))({
        url: "mongodb://127.0.0.1:27017/mall"
    })
});


app.use(sessionMiddleWare);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
    app.locals.isLogin = req.isAuthenticated();
    //app.locals.urlparameter = req.url; //현재 url 정보를 보내고 싶으면 이와같이 셋팅
    //app.locals.userData = req.user; //사용 정보를 보내고 싶으면 이와같이 셋팅
    app.locals.userData = req.user
    // app.locals.onName = req.body.displayName
    next();
});

app.use('/', express.static(__dirname + '/../../build'));

app.use('/api', api);

app.get('*', function(req,res){
    res.sendFile(path.resolve(__dirname + '/../../build', 'index.html'));
  });

//socket io 셋팅
app.io = require('socket.io')();
/*
app.io.on('connection', function(socket){
  console.log('socketio connected...');
});
*/
//socket io passport 접근하기 위한 미들웨어 적용
app.io.use(function(socket, next){
  sessionMiddleWare(socket.request, socket.request.res, next);
});
require('./libs/socketConnection')(app.io);

module.exports = app;