
var thinky = require('../lib/rethink');
var r = thinky.r;
var type = thinky.type;

var Coupon = thinky.createModel('coupons', {
  title:  type.string(), //Offer
  desc: type.string(), //Details
  desc2: type.string(), //Disclaimer
  expiration: type.date(),
  hasExpiration: type.boolean(),
  active: type.boolean(),
  hasImage: type.boolean(),
  category: type.string(),
  island: type.string(),
  img: type.string(),
  resource_url: type.string(),
  promo_code: type.string(),
  premium: type.boolean(),
  vendor: type.string(),
  vendor_url: type.string(),
  vendor_phone: type.string(),
  vendor_logo: type.string(),
  locations: [{
        url: type.string(),
        place_id: type.string(),
        address: type.string(),
        loc:{
            lat: type.string(),
            long: type.string()
        }  
  }],
  createdAt: type.date().default(r.now()),
  ownerId: type.string(),
});


Coupon.ensureIndex("createdAt");

module.exports = Coupon;
