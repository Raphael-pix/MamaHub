const mongoose = require('mongoose')
const {Schema} = mongoose

const usersSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    userId:{
        type:String
    },
    name:{
        type:String,
    },
    avatar:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    dateOfBirth:{
        type: String,
        //TODO : fix dateOfBirth to be of type date 
    },
    bio:{
        type: String
    },
    gender:{
        type:String
    },
    profileToken:{
        type:String
    },
    groups:{
        type:Object
    },
    journeys:{
        type:Object
    },
    Recommendations:{
        type:Object
    },
    date:{
        type: Date,
        default : Date.now
    }

})

module.exports = mongoose.model('Users',usersSchema)