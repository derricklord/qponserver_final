var express = require('express');
var router = express.Router();
var moment = require('moment');

var Coupon = require('../coupon/coupon.model');
var thinky = require('../lib/rethink');

var r = thinky.r;
var type = thinky.type;

var Analytic = require('../analytics/analytics.model');

var config = require('../config');
var util = require('../util/lib.js');

//Show all Analytics
router.get('/', function(req, res, next){
    Analytic.orderBy({index: r.desc('createdAt')}).getJoin({coupon: true}).run().then(function(logs) {
        var length = logs.length;  
        res.json({
            logs:logs,
            count: length
        });
    }).error(handleError(res));
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Analytic.filter({couponId: id}).getJoin({coupon: true}).run().then(function(logs) {  
        var length = logs.length;  
        res.json({
            logs:logs,
            count: length
        });
    }).error(handleError(res));
});


// Find Log Entry by id.
router.post('/web/:id', util.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;
    var entry = new Analytic({
        couponId: id,
        action: 'web',
        valid: true,
    });


    entry.save().then(function(entry) {
        res.json({log: entry});
    }).error(handleError(res));

});

// Find Log Entry by id.
router.post('/mobile/:id', function(req, res, next) {
    var id = req.params.id;
    var entry = new Analytic({
        couponId: id,
        action: 'mobile',
        valid: true,
    });


    entry.save().then(function(entry) {
        res.json({log: entry});
    }).error(handleError(res));

});

function handleError(res) {
    return function(error) {
        //return res.send(500, {error: error.message});
        return res.status(500).send({ message: error.message});
    }
}

module.exports = router;