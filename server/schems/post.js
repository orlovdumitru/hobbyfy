
var mongoose = require('mongoose');
// var Schema = mongoose.Schema;


var PostSchema = new mongoose.Schema({
    images: {
        type: Array
    },
    description: {
        type:String, 
        required:[true, 'Description is needed'],
        trim : true,
        minlength :[5, "Description must be at least 5 characters long"]
    },
    comments:{
        type: Array,
        trim: true,
        minlength: [3, "Comment must be at least 3 characters long"]
    },
    likes:{
        type: Number, default: 0
    }
}, {timestamps: true})


mongoose.model('post', PostSchema);