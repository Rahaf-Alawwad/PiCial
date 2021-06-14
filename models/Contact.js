const mongoose = require('mongoose');


const contactSchema = mongoose.Schema({
    
    email:{
        type:String,
        required:true
        
    },
    subject:{
        type:String,
        default:"PiCial Contact us"
  
    },
    message:{
        type:String,
        required:true

    },
    
},
{ timestamps: true })



const Contact = mongoose.model('Contact',contactSchema );

module.exports = Contact;