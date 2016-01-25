/*var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('./user.model');

var config = require('../config');
var util = require('../lib/util.js');


//Show all Users
router.get('/', function(req, res){
	User.find(function(err, user){
		res.send(user);
	});
});

// Find User by id.
router.get('/:id', util.ensureAuthenticated, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.send({ user: user });
  });
});

//Create a User
router.post('/', util.ensureAuthenticated, function(req, res) {
  var user = new User(req.body);
  
  user.save(function(err) {
    res.send({ user: user });
  });

});

// Update User by id.
router.put('/:id', util.ensureAuthenticated, function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    res.send({ user: req.body });
  });
});

// Delete User by id.
router.delete('/:id',  function(req, res) {
  User.findById(req.params.id).remove(function(err) {
    res.sendStatus(200);
  });
});

function handleError(res) {
    return function(error) {
        return res.send(500, {error: error.message});
    }
}

module.exports = router;
*/

var express = require('express');
var User = require('../user/user.model');
var router = express.Router();

var util = require('../lib/util.js');


router.get('/', function(req, res, next){
    User.orderBy({index: "createdAt"}).viewData().run().then(function(result) {
        res.send(result);
    }).error(handleError(res));
});

router.get('/:id', function(req, res, next) {
    User.get(req.params.id).removePassword().run().then(function(user) {
        res.send(user);
    }).error(handleError(res));   
});
    
router.post('/', function(req, res, next) {
    var user = new User(req.body);
    user.save().then(function(result) {
        res.send(result);
    }).error(handleError(res));
});
    
router.put('/:id', util.ensureAuthenticated, function(req, res, next) {
    User.get(req.params.id).update({
       email: req.body.email,
       displayName: req.body.displayName,
       picture: req.body.picture,
       facebook: req.body.facebook,
       google: req.body.google,
       isAdmin: req.body.isAdmin,
       isEnrolled: req.body.isEnrolled,
       role: req.body.role
    }).run().then(function(user) {
        res.send(user);
    }).error(handleError(res));

});

router.put('/:id/role/:role', util.ensureAuthenticated, function(req, res, next) {
    var newRole = req.params.role;
    var isAdmin = false;
    
    if(newRole === 'Admin'){
        isAdmin = true;
    }
    
    User.get(req.params.id).update({
       isAdmin: isAdmin,
       role: newRole,
    }).run().then(function(user) {
        res.sendStatus(200);
    }).error(handleError(res));

});

router.delete('/:id', util.ensureAuthenticated, function(req, res, next) {
    User.get(req.params.id).run().then(function(user) {
        user.delete().then(function(result) {
            res.sendStatus(200);
        }).error(handleError(res));
    }).error(handleError(res));    
});


function handleError(res) {
    return function(error) {
        //return res.send(500, {error: error.message});
        return res.sendStatus(500).send({error: error.message});
    }
}


module.exports = router;