
var mongoose = require('mongoose');
var Image = mongoose.model('Image');

module.exports = {
    uploadImage: function(req, resp){
        var image = new Image(req.body);
        image.save(function(err, image){
            if(err){
                resp.json({status: 'error'});
            }else{
                resp.json({status: 'success'});
            }
        })
    }, 
    getImages: function(req, resp){
        Image.find(function(err, image){
            if(err){
                resp.json({staus: 'error'});
            }else{
                resp.json({status: 'success', image: image})
            }
        })
    },
    deleteImage : function(req, resp){
        Image.deleteOne({_id : req.params.id}, function(err, image){
            if(err){
                resp.json({status: 'error'})
            }else{
                Image.find(function(err, image){
                    if(err){
                        resp.json({status: 'error'})
                    }else{
                        resp.json({status: 'success', image : image})
                    }
                })
            }
        })
    }
    // findOne: function(req, resp){
    //     Post.findById(req.params.id, function(err, post){
    //         if(err){
    //             res.json({status: 'error'})
    //         }else{
    //             resp.json({status: 'success', post: post})
    //         }
    //     });
    // },
    // update: function(req, resp){
    //     // req.body.updated_at = new Date();
    //     Post.update({_id: req.params.id}, {$set: req.body}, function(err){
    //         if(err){
    //             resp.json({status: "error"})
    //         }else{
    //             resp.json({status: "success"})
    //         }
    //     })
    // }
}