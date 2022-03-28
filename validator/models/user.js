const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    avatar : Buffer,
})

// userSchema.pre('save', function (next) {
//     if (this.isModified('password')) {
//       bcrypt.hash(this.password, 8, (err, hash) => {
//         if (err) return next(err);
  
//         this.password = hash;
//         next();
//       });
//     }
//   });
  


module.exports = mongoose.model('User',userSchema)