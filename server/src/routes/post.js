import express from 'express';
import multer from 'multer';
import path from 'path';
import PostModel from '../models/PostModel';
import fs from 'fs';
const uploadDir = path.join(__dirname, "../../uploads");

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + makeid() + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
    
});

const upload = multer({ storage:storage });

const router = express.Router();

const cpUpload = upload.fields(
    [
        {name : 'thumbnail', maxCount : 1}, 
        {name : 'bodyThumbnail1', maxCount : 1},
        {name : 'bodyThumbnail2', maxCount : 1},
        {name : 'bodyThumbnail3', maxCount : 1},
        {name : 'bodyThumbnail4', maxCount : 1}
    ]
);

router.post('/write',  cpUpload,(req, res, next) => {
    let post = new PostModel({
        title : req.body.title,
        price : req.body.price,
        thumbnail : (req.files['thumbnail'][0]) ? req.files['thumbnail'][0].filename : "",
        photo1 : (req.files['bodyThumbnail1'][0]) ? req.files['bodyThumbnail1'][0].filename : "",
        photo2 : (req.files['bodyThumbnail2'][0]) ? req.files['bodyThumbnail2'][0].filename : "",
        photo3 : (req.files['bodyThumbnail3'][0]) ? req.files['bodyThumbnail3'][0].filename : "",
        photo4 : (req.files['bodyThumbnail4'][0]) ? req.files['bodyThumbnail4'][0].filename : ""
    });

    post.save((err) => {
        if(err) return console.log(err);

        res.json({message : "success"});
    });
});


router.get('/list', (req, res) => {
    PostModel.find({}, (err, posts) => {
        res.json({posts : posts});
    });
}); 

router.post('/delete', (req, res)=>{
    PostModel.remove({id : req.body.id}, (err) => {
        if(err) return console.log(err);
        return res.json({message : "success"});
    });
});


router.get('/detail/:id', (req, res)=>{
    PostModel.findOne({id : req.params.id}, (err, post) => {
        if(err) return console.log(err);

        return res.json({post : post});
    })
});

router.post('/modify/:id', cpUpload, (req, res, next)=>{
    PostModel.findOne({id : req.params.id}, (err, post) => {

        // if(req.files){
        //     console.log(typeof(post.thumbnail))
        //     if(post.thumbnail !== '' || post.thumbnail !== null){
        //         fs.unlinkSync(uploadDir + '/' + post.thumbnail);
        //     }
           
        //     if(post.photo1 !== '' || post.photo1 !== null){
        //         fs.unlinkSync(uploadDir + '/' + post.photo1);
        //     }
            
        //     if(post.photo2 !== '' || post.photo2 !== null){
        //         fs.unlinkSync(uploadDir + '/' + post.photo2);
        //     }
            
        //     if(post.photo3 !== '' || post.photo3 !== null){
        //         fs.unlinkSync(uploadDir + '/' + post.photo3);
        //     }
            
        //     if(post.photo4 !== '' || post.photo4 !== null){
        //         fs.unlinkSync(uploadDir + '/' + post.photo4);
        //     }
        // }

        
        
  
        const query = { 
            title : req.body.title,
            price : req.body.price,
            thumbnail : (req.files) ? req.files['thumbnail'][0].filename : "",
            photo1 : (req.files) ? req.files['bodyThumbnail1'][0].filename : "",
            photo2 : (req.files) ? req.files['bodyThumbnail2'][0].filename : "",
            photo3 : (req.files) ? req.files['bodyThumbnail3'][0].filename : "",
            photo4 : (req.files) ? req.files['bodyThumbnail4'][0].filename : ""
        };

        const modifiedPost = new PostModel(query);
        if(!modifiedPost.validateSync()){
            PostModel.update({id : req.params.id}, {$set : query}, (err)=>{
                if(err) return console.log(err);
                return res.json({message : "success"});
            });
        }
    });
})


export default router;