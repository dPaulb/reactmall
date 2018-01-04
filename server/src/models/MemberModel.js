import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    username : {
        type : String,
        required : [true, '아이디는 필수입니다..']
    },
    password : {
        type : String,
        required : [true, '패스워드는 필수입니다..']
    },
    displayname : {
        type : String,
        required : [true, '닉네임은 필수입니다..']
    },
    created_at : {
        type : Date,
        default : Date.now
    }
})

MemberSchema.plugin(autoIncrement.plugin, {model : 'member', field : 'id', startAt : 1});
export default mongoose.model('member', MemberSchema);