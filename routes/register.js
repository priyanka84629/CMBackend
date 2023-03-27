const express=require('express');
const userModel = require("../Models/user")
const bcrypt = require("bcrypt")

const router= express.Router()
// router.use(express.urlencoded())
router.use(express.json())

//post method
router.post('/register',async(req,res)=>{
   try{
      const {email, password} = req.body
      
      //CHECKING IF EMAIL ALREADY EXISTS
      const check = await userModel.findOne({email:email})
      if(check){
         return res.status(409).json({
            status:"Failure",
            message:"User ID Already Exists"
         })
      }
      // HASHING THE PASSWORD
         bcrypt.hash(password, 10, async(err, cryptedPassword)=>{
            const result = await userModel.create({
               email,
               password:cryptedPassword
            })
            return res.status(201).json({
               Status:"Success",
               Message:result
            })
         })  
      }catch(e){
      res.status(400).json({
         status:"Failed",
         Message:e
      })
   }
 })

module.exports= router