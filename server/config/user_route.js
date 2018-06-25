
var Users = require('../controllers/users');
var path = require('path');

module.exports = function(app){
    
    app.post('/api/user', function(req, resp){
        Users.createUser(req, resp)
    })

    app.get('/api/users', function(req, resp){
        Users.getUsers(req, resp)
    })

    // // added return statement
    app.get('/api/user/:id', function(req, resp){
        Users.findOne(req, resp)
        // Pets.findOne(req, resp)
    })

    app.delete('/api/user/:id', function(req, resp){
        Users.deleteUser(req, resp)
    })
    
    app.patch('/api/user/:id/edit', function(req, resp){
        Users.update(req, resp)
    })
    
    app.all('*', (req, resp) =>{
        resp.sendFile(path.resolve('./hobbyfy/dist/hobbyfy/index.html'))
    })
}