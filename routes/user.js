const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Photographer = require('../models/Photographerer.Profile')
const Customer = require('../models/Customer.Profile')
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');


//register new user
router.post("/signup/user", async (req,res)=>{

    try{
        if(req.body.password != req.body.confirm){
            throw "PASSWORD MISMATCH"
        }

        const newUser = new User({ email:req.body.email,password:req.body.password,type:1});
        await newUser.save();


        const customerProfile = new Customer({name: req.body.name,user:newUser});
        await customerProfile.save();

    
        res.json({message:"Thank you for joining us!", user:newUser, success:true})

    }catch(err){
        // console.log(`Error in signup ${err}`)
        res.status(401).json({name: err.message,message:":(", success:false})
    }
})
router.post("/signup/photographer", async (req,res)=>{

    try{

        const newUser = new User({ email:req.body.email,password:req.body.password, type:2});
        await newUser.save();

        // save a new profile for the user
        const photograpgerProfile = new Photographer({name: req.body.name,user:newUser, type:req.body.type});
        await photograpgerProfile.save();
        

        res.json({message:"Thank you for joining us!", user:newUser, success:true})

    }catch(err){
        // console.log(`Error in signup ${err}`)
        res.status(401).json({name: err.message,message:":(", success:false})
    }
})

//user login authentication 
router.post("/signin", async (req,res)=>{

    try{

        const {email, password} = req.body;
        //check if sign in email exists
        
        let user = await User.findOne({email:email});
        //checking password 
        
        if(bcrypt.compareSync(password, user.password)){

            user.password="EnCt2a08023fd1d19b8261389f2a1ed0517a7becb9556a08023fd1d19b8261389f2a1ZH=hPWDjEgH3EN8xuGDNl1pTA46vRv1AY6seHUDlOZVodg==IwEmS";
            let token = jwt.sign({user}, process.env.SECRET, {expiresIn:60*60*1000})
            res.json({message:"login success",user:user, token, success:true})

        }else{
            res.json({message:"Wrong password/email", success:false})

        }


    }catch(err){
        // console.log(`Error in signup ${err}`)
        res.status(401).json({name: err.message,message:":(", success:false})
    }
})


router.post('/reset', async (req,res)=>{

    try{
        
        const email = req.body.email;
      
        //check if reset email exists
        let user = await User.findOne({email:email});
   
        //####################SEND EMAIL #######################


        //########################END###########################

        console.log("here")
        res.json({message:"Email sent successfully!", success:true})
        console.log("there")
    }catch(err){
        // console.log(`Error in signup ${err}`)
        res.status(401).json({name: err.message,message:":(", success:false})
    }
})


router.post("/profile", async (req,res)=>{
 

    try{
        
        let user = await Customer.find({user:req.body.id});
       
        res.json({message:"Welcome back!", user:user, success:true})

    }catch(err){
        // console.log(`Error in signup ${err}`)
        res.status(401).json({name: err.message,message:":(", success:false})
    }
})
router.post("/customer", async (req,res)=>{

    try{
        
        console.log("this one",req.body.id)
        let profile = await Customer.findById(req.body.id)
        
        
        res.json({message:"Welcome back!", profile:profile, success:true})

    }catch(err){
        // console.log(`Error in signup ${err}`)
        res.status(401).json({name: err.message,message:":(", success:false})
    }
})



router.post('/search', async (req,res)=>{

    try{
       
        const search = req.body.name;
      

        let photographers = await Photographer.find({ "name": { "$regex": search }})

       
        //#################### DO THINGS #######################


        //########################END###########################

  
        res.json({message:"Photographers found:", success:true, photographers:photographers })
 
    }catch(err){
        // console.log(`Error in signup ${err}`)
        res.status(401).json({name: err.message,message:":(", success:false})
    }
})
router.post('/search/profile', async (req,res)=>{

    try{
       
        const search = req.body.name;
     
        // let photographers = await Photographer.find({ "name": { "$regex": search } , "type":2})
        let photographers = await Photographer.find()
        
     
        //#################### DO THINGS #######################


        //########################END###########################

        console.log("here")
        res.json({message:"Photographers found:", success:true, photographers:photographers })
 
    }catch(err){
        // console.log(`Error in signup ${err}`)
        res.status(401).json({name: err.message,message:":(", success:false})
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

router.post("/order", async (req,res)=>{

    try{
        
        const customerID= req.body.customer;
        const photographerID= req.body.photographer;
       
        
        let customer = await User.findById(customerID);
        let photographer = await Photographer.findById(photographerID);

       

        const newOrder = new Order({ customer:customer,photographer:photographer});
        await newOrder.save();

        res.status(200).json({message:"Order created successfuly",newOrder:newOrder ,success:true})
     
        
    
    }catch(err){
       
        res.status(401).json({name: err.message,message:":(", success:false})
    }
})


router.post("/allOrders", async (req,res)=>{

    try{
    
        

        let orders = await Order.find({customer: req.body.id});
    

        res.status(200).json({message:"Order created successfuly",orders:orders, success:true})
     
        
    
    }catch(err){
        
        res.json({name: err.message,message:":(", success:false})
    }
})



router.post("/order/cancel", async (req,res)=>{

    try{
    
        

        let orders = await Order.findByIdAndRemove(req.body.id);
       

        res.status(200).json({message:"Order created successfuly",success:true})
     
        
    
    }catch(err){
        
        res.json({name: err.message,message:":(", success:false})
    }
})
module.exports = router;