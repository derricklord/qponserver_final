(function () {
    'use strict';
    
    angular.module('coupon')
      .factory('Coupons', function($http) {
        return {
          getCoupon: function(id) {
            return $http.get('/api/coupons/'+id);
          },
          getCoupons: function(){
            return $http.get('/api/coupons/');
          },
          postCoupon: function(pageData) {
            return $http.post('/api/coupons', pageData);
          },
          deleteCoupon: function(id){
            return $http.delete('/api/coupons/'+id);
          },
          updateCoupon: function(couponData) {
            return $http.put('/api/coupons/'+couponData.id, couponData);
          },       
        };
      });
})();   