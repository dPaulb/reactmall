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

var PostSchema = new Schema({
    title: {
        type: String,
        required: [true, '제목은 필수입니다..']
    },
    price: {
        type: Number,
        required: [true, '가격은 필수입니다..']
    },
    thumbnail: {
        type: String
    },
    photo1: {
        type: String
    },
    photo2: {
        type: String
    },
    photo3: {
        type: String
    },
    photo4: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

PostSchema.plugin(_mongooseAutoIncrement2.default.plugin, { model: "post", field: "id", startAt: 1 });
exports.default = _mongoose2.default.model("post", PostSchema);