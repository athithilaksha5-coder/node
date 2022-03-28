const express = require('express');
const admin = require("../models/admin")
const User = require("../models/user")
const jwt = require('jsonwebtoken');

exports.view = (req,res) =>{
    admin.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
}
exports.create = (req, res) => {
    var newAdmin = new admin();
    newAdmin.adminname = req.body.adminname;
    newAdmin.password = req.body.password   

    newAdmin.save(function (err, data) {
            if (err) {
                console.log(error);
                res.status(500).send({message: err.message || "Some error occurred while inserting the product."});
            }
            else {
                res.send("Data inserted");
            }
        });
    };


exports.adminLogin = async (req,res) =>{

    const {adminname, password } = req.body;
    try {
    const user = await admin.findOne({adminname});
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