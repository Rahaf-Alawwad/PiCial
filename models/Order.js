const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    
    photographer:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Photographerer.Profile'
        },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
        },
    photo:[{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Photo'
        }],
    price:{
        type:Number,
        default:100
    },
    accepted:{ type:Boolean, default:false},
    status:{
        type: String, 
        enum : ['Pending', 'Success', 'Fail'], 
        default: 'Pending' 
    },
},
{ timestamps: true })



const Order = mongoose.model('Order',orderSchema );

module.exports = Order;