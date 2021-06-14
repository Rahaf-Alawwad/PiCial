const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');

const userSchema = mongoose.Schema({


    email:{
        type:String,
        require:true, 
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    type:{
        type:Number,
        default:1
    },

},
{ timestamps: true })


//encrybt the password
userSchema.pre("save", function (next, done){

    let salt = bcrypt.genSaltSync();
    let hash = bcrypt.hashSync(this.password, salt);
 
    this.password =hash
    next()
})

const User = mongoose.model('User',userSchema );

module.exports = User;