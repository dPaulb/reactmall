'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongooseAutoIncrement2.default.initialize(_mongoose2.default.connection);
var Schema = _mongoose2.default.Schema;

var MemberSchema = new Schema({
    username: {
        type: String,
        required: [true, '아이디는 필수입니다..']
    },
    password: {
        type: String,
        required: [true, '패스워드는 필수입니다..']
    },
    displayname: {
        type: String,
        required: [true, '닉네임은 필수입니다..']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

MemberSchema.plugin(_mongooseAutoIncrement2.default.plugin, { model: 'member', field: 'id', startAt: 1 });
exports.default = _mongoose2.default.model('member', MemberSchema);