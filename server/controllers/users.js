
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    createUser: function(req, resp){
        var user = new User(req.body);
        user.save(function(err, user){
            if(err){
                resp.json({status: 'error'});
            }else{
                resp.json({status: 'success'});
            }
        })
    }, 
    getUsers: function(req, resp){
        User.find(function(err, user){
            if(err){
                resp.json({staus: 'error'});
            }else{
                resp.json({status: 'success', user: user})
            }
        })
    },
    deleteUser : function(req, resp){
        User.deleteOne({_id : req.params.id}, function(err, user){
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
    },
    findOne: function(req, resp){
        User.findById(req.params.id, function(err, user){
            if(err){
                res.json({status: 'error'})
            }else{
                resp.json({status: 'success', user: user})
            }
        });
    },
    update: function(req, resp){
        // req.body.updated_at = new Date();
        User.update({_id: req.params.id}, {$set: req.body}, function(err){
            if(err){
                resp.json({status: "error"})
            }else{
                resp.json({status: "success"})
            }
        })
    }
}