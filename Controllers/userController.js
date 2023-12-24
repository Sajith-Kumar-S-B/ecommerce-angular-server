const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const router = require('../Routes/router')
// register

exports.registerController = async (req,res)=>{
    const {username,email,password}= req.body
    try{

        const existingUser = await users.findOne({email})
        if(existingUser){
        res.status(406).json("Account Already Exist..Please Login")
        }else{
            const newUser = users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)

        }

    }catch(err){
        res.status(401).json(err)
    }
}

// login


exports.loginContoller = async(req,res)=>{
    const {email,password} = req.body
    try{
      const existingUser = await users.findOne({email,password})
      if(existingUser){
           const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY)
           res.status(200).json({
            existingUser,token
           })

      }else{
        res.status(406).json("Invalid email/password")

      }
    }catch(err){
    res.status(401).json(err)
    }

}