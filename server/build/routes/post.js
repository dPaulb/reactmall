'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _PostModel = require('../models/PostModel');

var _PostModel2 = _interopRequireDefault(_PostModel);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadDir = _path2.default.join(__dirname, "../../uploads");

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }return text;
}

var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function filename(req, file, cb) {
        cb(null, file.fieldname + makeid() + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }

});

var upload = (0, _multer2.default)({ storage: storage });

var router = _express2.default.Router();

var cpUpload = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'bodyThumbnail1', maxCount: 1 }, { name: 'bodyThumbnail2', maxCount: 1 }, { name: 'bodyThumbnail3', maxCount: 1 }, { name: 'bodyThumbnail4', maxCount: 1 }]);

router.post('/write', cpUpload, function (req, res, next) {
    var post = new _PostModel2.default({
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.files['thumbnail'][0] ? req.files['thumbnail'][0].filename : "",
        photo1: req.files['bodyThumbnail1'][0] ? req.files['bodyThumbnail1'][0].filename : "",
        photo2: req.files['bodyThumbnail2'][0] ? req.files['bodyThumbnail2'][0].filename : "",
        photo3: req.files['bodyThumbnail3'][0] ? req.files['bodyThumbnail3'][0].filename : "",
        photo4: req.files['bodyThumbnail4'][0] ? req.files['bodyThumbnail4'][0].filename : ""
    });

    post.save(function (err) {
        if (err) return console.log(err);

        res.json({ message: "success" });
    });
});

router.get('/list', function (req, res) {
    _PostModel2.default.find({}, function (err, posts) {
        res.json({ posts: posts });
    });
});

router.post('/delete', function (req, res) {
    _PostModel2.default.remove({ id: req.body.id }, function (err) {
        if (err) return console.log(err);
        return res.json({ message: "success" });
    });
});

router.get('/detail/:id', function (req, res) {
    _PostModel2.default.findOne({ id: req.params.id }, function (err, post) {
        if (err) return console.log(err);

        return res.json({ post: post });
    });
});

router.post('/modify/:id', cpUpload, function (req, res, next) {
    _PostModel2.default.findOne({ id: req.params.id }, function (err, post) {

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


        var query = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.files ? req.files['thumbnail'][0].filename : "",
            photo1: req.files ? req.files['bodyThumbnail1'][0].filename : "",
            photo2: req.files ? req.files['bodyThumbnail2'][0].filename : "",
            photo3: req.files ? req.files['bodyThumbnail3'][0].filename : "",
            photo4: req.files ? req.files['bodyThumbnail4'][0].filename : ""
        };

        var modifiedPost = new _PostModel2.default(query);
        if (!modifiedPost.validateSync()) {
            _PostModel2.default.update({ id: req.params.id }, { $set: query }, function (err) {
                if (err) return console.log(err);
                return res.json({ message: "success" });
            });
        }
    });
});

exports.default = router;