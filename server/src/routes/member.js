import express from 'express';
import MemberModel from '../models/MemberModel';
import passwordHash from  '../libs/passwordHash';
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

const router = express.Router();

passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser((user, done) => {
    let result = user;
    result.password = "";
    console.log('deserializeUser');
    done(null, result);
});

passport.use(new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
    },
    (req, username, password, done) => {
        MemberModel.findOne({username : username, password : passwordHash(password)}, (err, user) => {
            if(!user){
                return done(null, false, {message : "아이디 혹은 비밀번호가 유효하지 않습니다.."});
            }
            else{
                return done(null, user);
            }
        });
    }
));

router.post('/join', (req, res)=>{
    const member = new MemberModel({
        username : req.body.username,
        password : passwordHash(req.body.password),
        displayname : req.body.displayname
    });


    MemberModel.findOne({username : req.body.username}, (err, exists) => {
        if(exists){
            return res.json({message : "exists"});
        }
        member.save((err, member) => {
            if(err) return console.log(err);
            
            return res.json({message : "success"});
        })
    })

    
});

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info) => {
        if(!user){
            return res.json({ message: info.message });
        }
        req.logIn(user, (err) => {
            return res.json({message : "success"});
        })
    })(req, res, next);

   
});

router.get('/status', (req, res) => {
    // console.log(req.user);
    res.json({isLogin : req.isAuthenticated()});
});

router.post('/logout', (req, res) => {
    req.logout();
    return res.json({message : "success"})
});

export default router;