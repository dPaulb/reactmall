'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _MemberModel = require('../models/MemberModel');

var _MemberModel2 = _interopRequireDefault(_MemberModel);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebook = require('passport-facebook');

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

_passport2.default.serializeUser(function (user, done) {
    done(null, user);
});

_passport2.default.deserializeUser(function (user, done) {
    done(null, user);
});

_passport2.default.use(new _passportFacebook2.default({
    clientID: '643886142669035',
    clientSecret: '18f4ed57d2988a8a6477da8353859124',
    callbackURL: "http://localhost:8080/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    _MemberModel2.default.findOne({ username: "fb_" + profile.id }, function (err, user) {
        if (!user) {
            //없으면 회원가입 후 로그인 성공페이지 이동
            var regData = { //DB에 등록 및 세션에 등록될 데이터
                username: "fb_" + profile.id,
                password: "facebook_login",
                displayname: profile.displayName
            };
            var User = new _MemberModel2.default(regData);
            User.save(function (err) {
                //DB저장
                done(null, regData); //세션 등록
            });
        } else {
            //있으면 DB에서 가져와서 세션등록
            done(null, user);
        }
    });
}));

router.get('/facebook', _passport2.default.authenticate('facebook', { scope: 'email' }));

router.get('/facebook/callback', _passport2.default.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/auth/facebook/fail'
}));

router.get('/facebook/success', function (req, res) {
    res.send(req.user);
});

router.get('/facebook/fail', function (req, res) {
    res.send('facebook login fail');
});

module.exports = router;