
var Posts = require('../controllers/posts');
var path = require('path');

module.exports = function(app){
    
    app.post('/api/post', function(req, resp){
        Posts.createPost(req, resp)
    })

    app.get('/api/posts', function(req, resp){
        Posts.getPosts(req, resp)
    })

    // // added return statement
    app.get('/api/post/:id', function(req, resp){
        Posts.findOne(req, resp)
        // Pets.findOne(req, resp)
    })

    app.delete('/api/post/:id', function(req, resp){
        Posts.deletePost(req, resp)
    })
    
    app.patch('/api/post/:id/edit', function(req, resp){
        Posts.update(req, resp)
    })
    
    // app.all('*', (req, resp) =>{
    //     resp.sendFile(path.resolve('./hobbyfy/dist/hobbyfy/index.html'))
    // })
}