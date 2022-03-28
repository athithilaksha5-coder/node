const express = require('express')
const userSchema = require('../models/user');
const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/FRESHDB')
    .then(() => {
        console.log('our db is connected!!')
    })
    .catch(err => console.log(err.message));