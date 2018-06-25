
var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    f_name: {
        type:String, 
        required:[true, 'First name is required!'],
        trim : true,
        minlength :[3, "First name must be at least 3 characters"]
    },
    l_name:{
        type: String,
        required: [true, 'Last name is required!'],
        trim: true,
        minlength: [3, "Last name must be at least 3 characters"]
    },
    
    email: {
        type: String,
        required: true,
        minlength: [5, "Email is required, at least 5 characters"],
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
}, {timestamps: true})

// before saving Schema encript apssword
// to encript password we are going to use bycript
/*
Usage
async (recommended):
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


To hash a password:
Technique 1 (generate a salt and hash on separate function calls):

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});


To check a password:
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    // res == false
});
*/
UserSchema.pre('save', function(next){
    // implement bcript
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash){
        // optional for hashing password
        if(err){
            return next(err);
        } else{
            user.password = hash;
            next();
        }
    });
});


mongoose.model('user', UserSchema);