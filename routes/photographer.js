const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Photographer = require('../models/Photographerer.Profile')
const Customer = require('../models/Customer.Profile')
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');


router.post('/details', async (req,res)=>{

    try{
       
        let photographer = await Photographer.find({id:req.body.id})


        res.json({message:"Photographer profile found:", success:true, photographer:photographer })
 
    }catch(err){
      
        res.status(401).json({name: err.message,message:":(", success:false})
    }
})

router.post('/profile', async (req,res)=>{

    try{
       
        let user = await User.findById(req.body.user)
        let photographer = await Photographer.find({user:user})


        res.json({message:"Photographer profile found:", success:true, photographer:photographer,user:user })
 
    }catch(err){
      
        res.status(401).json({name: err.message,message:":(", success:false})
    }
})



router.post("/allRequests", async (req,res)=>{
    

    try{
        
       
        let orders = await Order.find({photographer: req.body.id});
  
      
        res.status(200).json({message:"Order created successfuly",orders:orders ,success:true})
     
        
    
    }catch(err){
        
        res.json({name: err.message,message:":(", success:false})
    }
})

router.post("/accept", async (req,res)=>{
    

    try{
        
       
        let orders = await Order.findOneAndUpdate(req.body.id, {accepted:req.body.accepted}, {
            returnOriginal: false
          });
        
      
        res.status(200).json({message:"Order created successfuly",orders:orders ,success:true})
     
        
    
    }catch(err){
        
        res.json({name: err.message,message:":(", success:false})
    }
})

router.post("/update", async (req,res)=>{
    

    try{
        
        
        let user = await Customer.findOneAndUpdate(req.body.id, req.body.user)
        
      
        res.status(200).json({message:"Order created successfuly",success:true})
     
        
    
    }catch(err){
        
        res.json({name: err.message,message:":(", success:false})
    }
})

module.exports = router;