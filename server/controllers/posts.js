
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = {
    createPost: function(req, resp){
        var post = new Post(req.body);
        post.save(function(err, post){
            if(err){
                resp.json({status: 'error'});
            }else{
                resp.json({status: 'success'});
            }
        })
    }, 
    getPosts: function(req, resp){
        Post.find(function(err, post){
            if(err){
                resp.json({staus: 'error'});
            }else{
                resp.json({status: 'success', post: post})
            }
        })
    },
    deletePost : function(req, resp){
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
    },
    findOne: function(req, resp){
        Post.findById(req.params.id, function(err, post){
            if(err){
                res.json({status: 'error'})
            }else{
                resp.json({status: 'success', post: post})
            }
        });
    },
    update: function(req, resp){
        // req.body.updated_at = new Date();
        Post.update({_id: req.params.id}, {$set: req.body}, function(err){
            if(err){
                resp.json({status: "error"})
            }else{
                resp.json({status: "success"})
            }
        })
    }
}