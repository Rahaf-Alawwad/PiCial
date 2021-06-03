const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');

const userSchema = mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true, 
        unique:true
    },
    password:{
        type:String,
        require:true
    }
},
{timeStamp:true})


//encrybt the password
userSchema.pre("save", function (next, done){

    let salt = bcrypt.genSaltSync();
    let hash = bcrypt.hashSync(this.password, salt);
 
    this.password =hash
    next()
})

const User = mongoose.model('User',userSchema );

module.exports = User;