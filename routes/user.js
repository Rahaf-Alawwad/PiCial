const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken')


//register new user
router.post("/signup", async (req,res)=>{

    try{

        const newUser = new User(req.body);
        await newUser.save();

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

        
       

        res.json({message:"Thank you for joining us!", user:newUser, success:true})

    }catch(err){
        // console.log(`Error in signup ${err}`)
        res.status(401).json({name: err.message,message:":(", success:false})
    }
})
















module.exports = router;