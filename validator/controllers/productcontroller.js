const express = require('express');
const ProductModel = require('../models/productSchema');
const jwt = require('jsonwebtoken');

// Create and Save a new Note
exports.create = (req, res) => {
    var newProduct = new ProductModel();
    newProduct.ProductId = req.body.ProductId;
    newProduct.ProductName = req.body.ProductName;
    newProduct.Quantity = req.body.Quantity;
    newProduct.Price = req.body.Price;

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
        newProduct.save(function (err, data) {
            if (err) {
                console.log(error);
                res.status(500).send({message: err.message || "Some error occurred while inserting the product."});
            }
            else {
                res.send("Data inserted");
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
    };
// // Retrieve and return all products from the database.
exports.findAll = (req, res) => {
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
        ProductModel.find(function(err, data) {
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
    
    
            };

exports.deleteProduct = (req,res) =>{
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
        ProductModel.remove({ProductId:req.body.ProductId}, 
                function(err, data) {
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

    
    };

exports.updateProduct = (req, res) => {
        ProductModel.findByIdAndUpdate(req.body.id,
            { ProductName: req.body.ProductName }, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(data);
                    console.log("Data updated!");
                }
            });
        }


