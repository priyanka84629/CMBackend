const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require("../Models/user")
const jwt = require("jsonwebtoken")
//jwt Secret key
const secret = "ContactManager"
//Middle wares
router.use(express.json())
router.use(express.urlencoded())

//post method
router.post("/login", async(req, res)=>{    
    try{   
        const {email, password} = req.body;
        const data = await userModel.findOne({email:email})
        if(!data){
            return res.status(404).json({
                status:"Failed",
                message:"User Id Not Found"
            })
        }
        else{
            // COMPARING THE HASHED PASSWORD AND REQUESTED PASSWRD
            bcrypt.compare(password, data.password, (err, result)=>{
                if(!result){
                   return res.status(403).json({
                        status:"Failed",
                        message:"Invalid User Password"
                    })   
                }
                else{
                    // GENERATIONG TOKENS
                    const token=jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60* 60 *60),
                        data: data._id
                      }, secret);
                    const userdetails = {...data._doc, password: undefined}
                    return res.status(200).json({
                        status:"Success",
                        message: {token, userdetails}
                    })
                }
            })
        }     
    }catch(e){
        console.log(e)
    }
})

module.exports = router