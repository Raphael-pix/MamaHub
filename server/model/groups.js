const mongoose = require('mongoose')
const {Schema} = mongoose

const groupsSchema = new Schema({
    groupId:{
        type:String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required: true,
        unique: true
    },
    description:{
        type:String,
    },
    avatar:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    banner:{
        type:String,
        default: "https://t4.ftcdn.net/jpg/05/72/54/67/360_F_572546714_2mn39TUv2f5Lmg7JRT9yvSkuTJERGyg8.jpg",
    },
    status:{
        type:String,
    },
    topics:{
        type:Object
    }, 
    members:{
        type:Object
    },
    created_by:{
        type:String,
    },
    date:{
        type: Date,
        default : Date.now
    }

})

module.exports = mongoose.model('Groups',groupsSchema)