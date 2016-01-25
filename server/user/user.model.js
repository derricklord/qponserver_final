/*

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var User = require('../user/user.model');
var ObjectId = mongoose.Schema.ObjectId;



var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  picture: String,
  facebook: String,
  google: String,
  isAdmin: Boolean,
  isVendor: Boolean,
  role: String,
  roleVerified: Boolean
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};


module.exports = mongoose.model('User', userSchema);
*/

var thinky = require('../lib/rethink');
var auth = require('../lib/auth');
var bcrypt = require('bcrypt');

var r = thinky.r;
var type = thinky.type;

var Coupon = require('../coupon/coupon.model');


var User = thinky.createModel('users', {
    id: type.string(),
    email: type.string().email().lowercase(),
    password: type.string(),
    displayName: type.string(),
    picture: type.string(),
    facebook: type.string(),
    google: type.string(),
    isAdmin: type.boolean(),
    isVendor: type.boolean(),
    role: type.string(),
    roleVerified: type.boolean(),
    createdAt: type.date().default(r.now())
});




User.pre('save', function(next) {

  var self = this;

  bcrypt.genSalt(10, function (err, salt) {

    if(err) return next(err);
    bcrypt.hash(self.password, salt, function (err, hash) {

      if(err) return next(err);
      self.password = hash;
      next();

    });
  });
});


User.comparePassword = function(password, user, callback) {
  bcrypt.compare(password, user.password, function(err, match) {
    if (err) callback(err);

    if (match) {
      callback(null, true);
    } else {
      callback(err);
    }
  });
}

User.defineStatic('removePassword', function(){
   return this.without('password'); 
});

User.defineStatic('removeRole', function(){
   return this.without('role'); 
});

User.defineStatic('viewData', function(){
    return this.without('role', 'password', 'isAdmin');
});


User.ensureIndex("createdAt");
User.ensureIndex("displayName");
User.hasMany(Coupon, "coupons", "id", "ownerId");
Coupon.belongsTo( User, 'owner', 'ownerId', 'id');

module.exports = User;
