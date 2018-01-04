'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _MemberModel = require('../models/MemberModel');

var _MemberModel2 = _interopRequireDefault(_MemberModel);

var _passwordHash = require('../libs/passwordHash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStrategy = _passportLocal2.default.Strategy;

var router = _express2.default.Router();

_passport2.default.serializeUser(function (user, done) {
    console.log('serializeUser');
    done(null, user);
});

_passport2.default.deserializeUser(function (user, done) {
    var result = user;
    result.password = "";
    console.log('deserializeUser');
    done(null, result);
});

_passport2.default.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    _MemberModel2.default.findOne({ username: username, password: (0, _passwordHash2.default)(password) }, function (err, user) {
        if (!user) {
            return done(null, false, { message: "아이디 혹은 비밀번호가 유효하지 않습니다.." });
        } else {
            return done(null, user);
        }
    });
}));

router.post('/join', function (req, res) {
    var member = new _MemberModel2.default({
        username: req.body.username,
        password: (0, _passwordHash2.default)(req.body.password),
        displayname: req.body.displayname
    });

    _MemberModel2.default.findOne({ username: req.body.username }, function (err, exists) {
        if (exists) {
            return res.json({ message: "exists" });
        }
        member.save(function (err, member) {
            if (err) return console.log(err);

            return res.json({ message: "success" });
        });
    });
});

router.post('/login', function (req, res, next) {
    _passport2.default.authenticate('local', function (err, user, info) {
        if (!user) {
            return res.json({ message: info.message });
        }
        req.logIn(user, function (err) {
            return res.json({ message: "success" });
        });
    })(req, res, next);
});

router.get('/status', function (req, res) {
    // console.log(req.user);
    res.json({ isLogin: req.isAuthenticated() });
});

router.post('/logout', function (req, res) {
    req.logout();
    return res.json({ message: "success" });
});

exports.default = router;