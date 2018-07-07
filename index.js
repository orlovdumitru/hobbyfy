
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');


var fileRoutes = require('./routes/file');
app.use('/file', fileRoutes);

mongoose.connect('mongodb://localhost/hobby');

var path = require('path');
// var port = process.env.PORT || 8000
const PORT = process.env.PORT || 8000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, '/hobbyfy/dist/hobbyfy')));

app.set('views', path.join(__dirname, '/hobbyfy/dist/hobbyfy'))


app.listen(PORT, function(){
    console.log('port is runnig on ' + PORT);
})

//************************************************************************ */
var PostSchema = new mongoose.Schema({
    title : String,
    
    description: {
        type:String, 
        required:[true, 'Description is needed'],
        trim : true,
        minlength :[5, "Description must be at least 5 characters long"]
    },
    images: [{
        imgname: String
    }],
    comments:[{
        user: String,
        content:{type : String, minlength :[ 3, "Comment must be at least 3 characters long"]}
    }],
    likes:{
        type: Number, default: 0
    },
    category : {
        type : String,
        required:[true, 'Category is needed'],
        default:"Uncategorized"
    }
}, {timestamps: true})


mongoose.model('post', PostSchema);
var Post = mongoose.model('post');

//************************************************************************ */

var UserSchema = new mongoose.Schema({
    full_name: {
        type:String, 
        required:[true, 'Please enter your full name is required!'],
        trim : true,
        minlength :[3, "Name must be at least 3 characters"]
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
var User = mongoose.model('user');


//******************************************************************************** */
    app.post('/api/posts', function(req, resp){

        console.log(req.body);
        var post = new Post(req.body);
        post.save(function(err, post){
            if(err){
                resp.json({status: 'error'});
            }else{
                resp.json(post);
            }
        })
    })
    
    app.get('/api/posts', function(req, resp){
        Post.find({}).sort({createdAt: -1}).exec(function(err, posts){
            if(err){
                resp.json({staus: 'error'});
            }else{
                resp.json({status: 'success', posts: posts})
            }
        })
    })


    app.delete('/api/post/:id', function(req, resp){  
        Post.deleteOne({_id : req.params.id}, function(err, post){
            if(err){
                resp.json({status: 'error'})
            }else{
                Post.find(function(err, post){
                    if(err){
                        resp.json({status: 'error'})
                    }else{
                        resp.json({status: 'success', post : post})
                    }
                })
            }
        })
    })

    app.get('/api/posts/id/:id', function(req, resp){
        Post.findById(req.params.id, function(err, post){
            if(err){
                res.json({status: 'error'})
            }else{
                resp.json({status: 'success', post: post})
            }
        });
    })



    app.patch('/api/post/:id/edit', function(req, resp){
        req.body.updated_at = new Date();
        Post.update({_id: req.params.id}, {$set: req.body}, function(err){
            if(err){
                resp.json({status: "error"})
            }else{
                resp.json({status: "success"})
            }
        })
    })


    //update posts and set one like more
    app.get('/api/post/:id/like', function(req, resp){
        let data;
        var id = req.params.id;
        Post.findById(id, function(err, post){
            if(err){
                resp.json({status: 'error'})
            }
            else{
                post.likes = post.likes + 1;

                post.save(function(error, data){
                    if(error){
                        resp.json({error:error});
                    }
                    else{
                        resp.json({post:post});
                    }
                });
            }
        });
    })


    //update a movies add new review
    app.put('/api/post/:id/comment', function (req, res) {
        var id = req.params.id;
        Post.update(
            { _id: id }, 
            { $push: { comments: req.body } },
            function (error, success) {
                if (error) {
                    // console.log(error);
                    return res.json(error)
                } 
                else {
                    return res.json({'success':"success"});        
                }
            }
        );
    });

    
    app.get('/api/comment/:id', function (req, res){
        var id = req.params.id;
        Post.findById(id, function(err, post){
            if(err){
                return res.json({status: 'error'})
            }
            else{
                return res.json({comments: post.comments})
            }
            
        });  
    });


//************************************************************************ */

    app.post('/api/user', function(req, resp){
        var user = new User(req.body);
        user.save(function(err, user){
            if(err){
                resp.json({status: 'error'});
            }else{
                resp.json({status: 'success'});
            }
        })
    });
    
    app.get('/api/users', function(req, resp){
        User.find(function(err, user){
            if(err){
                resp.json({staus: 'error'});
            }else{
                resp.json({status: 'success', user: user})
            }
        })
    })


    app.delete('/api/user/:id', function(req, resp){
        User.deleteOne({_id : req.params.id}, function(err){
            if(err){
                resp.json({status: 'error'})
            }else{
                User.find(function(err, user){
                    if(err){
                        resp.json({status: 'error'})
                    }else{
                        resp.json({status: 'success', user : user})
                    }
                })
            }
        })
    })

    app.get('/api/user/:id', function(req, resp){
        User.findById(req.params.id, function(err, user){
            if(err){
                res.json({status: 'error'})
            }else{
                resp.json({status: 'success', user: user})
            }
        });
    })

    app.patch('/api/user/:id/edit', function(req, resp){
        User.update({_id: req.params.id}, {$set: req.body}, function(err){
            if(err){
                resp.json({status: "error"})
            }else{
                resp.json({status: "success"})
            }
        })
    })


    app.post('/file/download', function(req, res, next){
        // console.log(req.body.filename);
        let filepath = path.join(__dirname, './uploads') + '/' + req.body.filename
        res.sendFile(filepath);
    });

    app.all("*", function(req, resp){
        resp.sendFile(path.resolve('./hobbyfy/dist/hobbyfy/index.html'))
    })