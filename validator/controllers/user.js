const express = require('express');
const { add } = require('nodemon/lib/rules');
const app = express();
const User = require('../models/user');
app.use(express.json());
const jwt = require('jsonwebtoken');
require("dotenv").config();


exports.createUser = async (req,res) =>{ 
    const newUser = User();
    const { fullname, email, password,confirmPassword,phonenumber,address } = req.body;
     try {
        const user = await User.findOne({ email });
        if (user)
        {
          return res.json({
            success: false,
            message: 'This Email is already in use, try sign-in!!',                        
          });
        }
        else {
            newUser.fullname = fullname,
            newUser.email = email,
            newUser.password = password,
            newUser.confirmPassword = confirmPassword,
            newUser.phonenumber = phonenumber,
            newUser.address = address       
            newUser.save();
            res.json({ success: true,msg:"You are successfully register!!",newUser});
           //res.json(user);
          }    
          
        } catch (error) {
          console.log('error inside createUser method', error.message);
          return false;
        }
      }
         
exports.userLogin = async (req,res) =>{

const {email, password } = req.body;
try {
const user = await User.findOne({ email });
if (user)
{
    if(user.password == password)
    {
    const token = jwt.sign({ userId: user._id }, "alliswell", {
        expiresIn: '1hr',
        })

    return res.json({
    success: true,
    message: 'You are successfully login!!',
    data: user,
    token: token                        
    });
    }
    else{
        return res.json({
            
            message: 'incorrect password!!',                        
            });
    }

}
else{
return res.json({
    success: false,
    message: 'You are not a member, please register!!',                        
    });
}            
} catch (error) {
    console.log('error inside userLogin method', error.message);
    return false;
}
}
    
exports.userDetails = (req,res) =>{
    if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];  
//Authorization: 'Bearer TOKEN'
try{
    if(!token)
    {
        res.status(200).json({success:false, message: "Error!Token was not provided."});
    }
    //Decoding the token
    const decodedToken = jwt.verify(token,"alliswell" );
    User.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });   
}
catch(error){
    if (error.name === 'JsonWebTokenError') {
        return res.json({ success: false, message: 'unauthorized access!' });
        }

        if (error.name === 'TokenExpiredError') {
            return res.json({
              success: false,
              message: 'sesson expired try sign in!',
            });
          }
}  
}    
}






