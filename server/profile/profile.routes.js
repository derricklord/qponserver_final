var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');

var Coupon = require('../coupon/coupon.model');
var User = require('../user/user.model');

var config = require('../config');
var util = require('../lib/util.js');

// Find Profile by id.
/*
router.get('/', util.ensureAuthenticated, function(req, res) {
    User.findOne({_id: req.user})
        .exec(function(err, profile) {
            res.send(profile);
        });    
}); 
*/

router.get('/', util.ensureAuthenticated, function(req, res, next) {
	//console.log('Authenticated user: ', req.user);
    User.get(req.user).run().then(function(profile) {

    	//console.log(profile);      
        res.json(profile);

    }).error(handleError(res));
});

function handleError(res) {
    return function(error) {
        //return res.send(500, {error: error.message});
        return res.sendStatus(500).send({error: error.message});
    }
}


module.exports = router;