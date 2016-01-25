(function () {
    'use strict';
    
    angular.module('coupon')
      .factory('Logs', function($http) {
        return {
          getLogs: function(id){
            return $http.get('/api/analytics/'+id);
          },
          postLog: function(id) {
            return $http.post('/api/analytics/web/'+id);
          }     
        };
      });
})(); 