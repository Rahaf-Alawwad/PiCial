const mongoose = require('mongoose');


const customerSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    user:[{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
        }],
    Orders:[{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Order'
        }],

        location:{
            type:String,
            default:"MysteryLand"
          
        },
        image:{
            type:String,
            default:"data:image/png;base64,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"
        }
        
},
{ timestamps: true })



const Customer = mongoose.model('Customer',customerSchema );

module.exports = Customer;