const mongoose = require('mongoose')
const {Schema} = mongoose

const postSchema = new Schema({
    media:{
        type: Object
    },
    caption:{
        type:String,
        default:""
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    },
    likes:{
        type: Number,
        default: 0,
    },
    shares:{
        type: Number,
        default: 0,
    },
    saves:{
        type: Number,
        default: 0,
    },
    comments:{
        type: Object,
    }
})
module.exports = mongoose.model('Posts',postSchema)