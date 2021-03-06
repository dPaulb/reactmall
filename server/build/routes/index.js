'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

var _member = require('./member');

var _member2 = _interopRequireDefault(_member);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/post', _post2.default);
router.use('/member', _member2.default);
router.use('/auth', _auth2.default);

exports.default = router;