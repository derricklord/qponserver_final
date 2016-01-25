/*
var mongoose = require('mongoose');
var Coupon = require('../coupon/coupon.model');
var ObjectId = mongoose.Schema.ObjectId;


var analyticsSchema = new mongoose.Schema({
  action:  String,
  coupon: {type: ObjectId, ref: 'Coupon'},   
  created_on: Date, 
  valid: Boolean,
});

module.exports = mongoose.model('Analytics', analyticsSchema);
*/

var thinky = require('../lib/rethink');
var r = thinky.r;
var type = thinky.type;
var Coupon = require('../coupon/coupon.model');


var Analytic = thinky.createModel('analytics', {
  action:  type.string(),
  valid: type.boolean(),
  createdAt: type.date().default(r.now()),
  couponId: type.string(),
});


Analytic.ensureIndex("createdAt");

Coupon.hasMany(Analytic, "analytics", "id", "couponId");
Analytic.belongsTo( Coupon, 'coupon', 'couponId', 'id');



module.exports = Analytic;