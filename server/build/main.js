'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import listen from 'socket.io';


var db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log("Connected To MongoDB Server");
});

var connect = _mongoose2.default.connect('mongodb://127.0.0.1:27017/mall');
_mongooseAutoIncrement2.default.initialize(_mongoose2.default.connection);

var app = (0, _express2.default)();

var port = 8080;

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());

app.use('/uploads', _express2.default.static('uploads'));

var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);

var sessionMiddleWare = (0, _expressSession2.default)({
    name: 'mall_cookie',
    secret: 'mall',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2000 * 60 * 60
    },
    store: new (require("connect-mongo")(_expressSession2.default))({
        url: "mongodb://127.0.0.1:27017/mall"
    })
});

app.use(sessionMiddleWare);
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use((0, _connectFlash2.default)());

app.use(function (req, res, next) {
    app.locals.isLogin = req.isAuthenticated();
    //app.locals.urlparameter = req.url; //현재 url 정보를 보내고 싶으면 이와같이 셋팅
    //app.locals.userData = req.user; //사용 정보를 보내고 싶으면 이와같이 셋팅
    app.locals.userData = req.user;
    // app.locals.onName = req.body.displayName
    next();
});

app.use('/', _express2.default.static(__dirname + '/../../build'));

app.use('/api', _routes2.default);

app.get('*', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname + '/../../build', 'index.html'));
});

//socket io 셋팅
app.io = require('socket.io')();
/*
app.io.on('connection', function(socket){
  console.log('socketio connected...');
});
*/
//socket io passport 접근하기 위한 미들웨어 적용
app.io.use(function (socket, next) {
    sessionMiddleWare(socket.request, socket.request.res, next);
});
require('./libs/socketConnection')(app.io);

module.exports = app;