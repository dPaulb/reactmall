import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title : {
        type : String,
        required : [true, '제목은 필수입니다..']
    },
    price : {
        type : Number,
        required : [true, '가격은 필수입니다..']
    },
    thumbnail : {
        type : String
    },
    photo1 : {
        type : String
    },
    photo2 : {
        type : String
    },
    photo3 : {
        type : String
    },
    photo4 : {
        type : String
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});

PostSchema.plugin(autoIncrement.plugin, {model : "post", field : "id", startAt : 1});
export default mongoose.model("post", PostSchema);