const jwt = require("jsonwebtoken")
const User = require("../Models/user")

const verify =(req, res, next)=>{

    const authorizationHeader = req.headers.authorization
    if(authorizationHeader){
        const token = authorizationHeader
        jwt.verify(token, 'ContactManager', async(err, payload)=>{
            try{
                if(err){
                    return res.status(401).json({error: "Unauthorized!"})
                }
                const user = await User.findOne({_id: payload._id}).select(
                    "-password"
                )
                req.user = user;
                next();
            } catch(e){
                console.log(err);
            }
        })
    } else{
        return res.status(403).json({error: "Forbidden"})
    }
}
module.exports=verify