var mongoose=require('mongoose');

var ProductSchema = new mongoose.Schema({
	ProductId:{
        type:Number,
        required:true
    },
	ProductName:{
        type:String,
        required:true
    },
	Quantity: {
        type:Number,
        required:true},

    Price:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('product', ProductSchema);

