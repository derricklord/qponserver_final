var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = process.env.TOKEN_SECRET;



module.exports.authorize = function (req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, secret);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' });
    }

    req.user = payload.sub; 
    next();
};


module.exports.generate_token = function(user){
    return jwt.encode({
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
    });
}

module.exports.hash_password = function (password) {
    bcrypt.genSalt(10, function (error, salt) {
        if(error) return (error);

        bcrypt.hash(password, salt, function (error, hash) {
            if(error) return (error);
            return hash;
        });
    });
};

module.exports.authenticate = function (password, hash) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, hash, function (error, response) {
            if(error) return reject(error);
            return resolve(response);
        });
    });
};

