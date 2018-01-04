import express from 'express';
import UserModel from '../models/MemberModel';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

const router = express.Router();

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


passport.use(new FacebookStrategy({
    clientID : '643886142669035',
    clientSecret : '18f4ed57d2988a8a6477da8353859124',
    callbackURL : "http://localhost:8080/api/auth/facebook/callback",
    profileFields : ['id', 'displayName', 'photos', 'email']
},
function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    UserModel.findOne({ username : "fb_" + profile.id }, function(err, user){
        if(!user){  //없으면 회원가입 후 로그인 성공페이지 이동
            var regData = { //DB에 등록 및 세션에 등록될 데이터
                username :  "fb_" + profile.id,
                password : "facebook_login",
                displayname : profile.displayName
            };
            var User = new UserModel(regData);
            User.save(function(err){ //DB저장
                done(null,regData); //세션 등록
            });
        }else{ //있으면 DB에서 가져와서 세션등록
            done(null,user);
        }

    });
}
)
);

router.get('/facebook', passport.authenticate('facebook', {scope : 'email'}));

router.get('/facebook/callback', passport.authenticate('facebook', 
{
    successRedirect: '/',
    failureRedirect: '/auth/facebook/fail'
}));

router.get('/facebook/success', function(req,res){
    res.send(req.user);
});

router.get('/facebook/fail', function(req,res){
    res.send('facebook login fail');
});

module.exports = router;
