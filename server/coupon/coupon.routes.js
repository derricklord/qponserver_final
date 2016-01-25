
//New Coupon Routes

var express = require('express');
var router = express.Router();
var util = require('../lib/util.js');
var Coupon = require('../coupon/coupon.model');
var thinky = require('../lib/rethink');

var r = thinky.r;
var type = thinky.type;

router.get('/', function(req, res, next){

    Coupon.orderBy({index: r.desc('createdAt')}).getJoin({owner: true}).run().then(function(coupons) {
        coupons.forEach(function(coupon){
            delete coupon.owner.password;
            delete coupon.owner.role;
        });
        res.json({coupons:coupons});
    }).error(handleError(res));
});


//Show all coupons
router.get('/all', function(req, res){
    Coupon.orderBy({index: r.desc('createdAt')}).filter({active:true}).run().then(function(coupons) {
        /*
        coupons.forEach(function(coupon){
            delete coupon.owner.password;
            delete coupon.owner.role;
        });
        */
        res.json({coupons:coupons});
    }).error(handleError(res));
});

// Upload Coupon
router.get('/upload', function(req, res){
    console.log('Uploading coupon');
    res.send({message:'File Uploaded!'});
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Coupon.get(id).getJoin({owner: true}).run().then(function(coupon) {
    //Coupon.get(id).getJoin({owner: true}).run().then(function(coupon) {    
        delete coupon.owner.password;
        delete coupon.owner.role;       
        res.json(coupon);
    }).error(handleError(res));
});
    
router.post('/', util.ensureAuthenticated, function(req, res, next) {
    var coupon = new Coupon({
        ownerId: req.user,
        title: req.body.title,
        desc: req.body.desc,
        desc2: req.body.desc2,
        category: req.body.category,
        hasExpiration: req.body.hasExpiration,
        expiration: req.body.expiration,
        hasImage: req.body.hasImage,
        img: req.body.img,
        active: req.body.active,
        resource_url: req.body.resource_url,
        island: req.body.island,
        premium: req.body.premium,
        promo_code: req.body.promo_code,
        vendor: req.body.vendor,
        vendor_url: req.body.vendor_url,
        vendor_phone: req.body.vendor_phone,
        vendor_logo: req.body.vendor_logo,
        locations: []
    });

    if(req.body.locations){
         req.body.locations.forEach(function(location){
            coupon.locations.push({ 
                url: location.url,
                place_id: location.place_id,
                address: location.address,
                loc: {
                    lat: location.loc.lat.toString(),
                    long: location.loc.long.toString()
                }

            });
        });       
    }

    coupon.save().then(function(newCoupon) {
        res.json({coupon: newCoupon});
    }).error(handleError(res));

});

router.put('/:id', util.ensureAuthenticated, function(req, res, next) {
    Coupon.get(req.params.id).run().then(function(coupon) {

        if(req.body.title){
            coupon.title = req.body.title;
        }
        
        if(req.body.desc){
            coupon.desc = req.body.desc;
        }
        
        if(req.body.desc2){
            coupon.desc2 = req.body.desc2;
        }
        
        if(req.body.category){
            coupon.category = req.body.category;
        }

        if(req.body.island){
            coupon.island = req.body.island;
        }        
        


        if(req.body.expiration){
            coupon.expiration = req.body.expiration;
        }  


        coupon.hasExpiration = req.body.expires;
        coupon.premium = req.body.premium;
        coupon.hasImage = req.body.hasImage;
        coupon.isActive = req.body.isActive;
        
        if(req.body.vendorInfo){
            coupon.vendorInfo = req.body.vendorInfo;
        }
        
        if(req.body.vendor){
            coupon.vendor = req.body.vendor;
        }
      
      

        if(req.body.desc){
            coupon.desc = req.body.desc;
        }
      
        if(req.body.resource_url){
            coupon.resource_url = req.body.resource_url;
        }

        if(req.body.img){
            coupon.img = req.body.img;
        }

        if(req.body.vendor_logo){
            coupon.vendor_logo = req.body.vendor_logo;
        }

 
        coupon.save().then(function(coupon) {
            res.json({coupon: coupon});
        }).error(handleError(res));
    }).error(handleError(res));

});

router.delete('/:id', util.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;
    Coupon.get(id).run().then(function(coupon) {
        coupon.delete().then(function(result) {
            res.sendStatus(200);
        }).error(handleError(res));
    }).error(handleError(res));    
});


function handleError(res) {
    return function(error) {
        //return res.send(500, {error: error.message});
        return res.status(500).send({ message: error.message});
    }
}


module.exports = router;











