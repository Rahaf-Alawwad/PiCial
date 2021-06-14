const mongoose = require('mongoose');


const photoSchema = mongoose.Schema({
    

    type:{
        type: String, 
        enum : ['Adults', 'Children', 'Pets'], 
        default: 'Adults' 
    },
    theme:{
        type: [String], 
        enum : ['Classic','Architectural', 'Monochrome', 'Urban', 'Food', 'Fashion', 'Vintage'], 
        default: 'Classic' 
    }
},
{ timestamps: true })



const Photo = mongoose.model('Photographer',photoSchema );

module.exports = Photo;