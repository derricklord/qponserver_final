(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('viewCtrl', viewCtrl);

    viewCtrl.$inject = ['$scope', 'Coupons', 'Logs', '$stateParams'];

    /* @ngInject */
    function viewCtrl($scope, Coupons, Logs, $stateParams){
        //Page Variables
        var id = $stateParams.id;
        $scope.coupon = {};
        $scope.init = init;
        
        //Initialize
        function init(){
            Logs.postLog(id).
                success(function(data){
                    //console.log('Log posted: ', data);
                })
                .error(function(error){
                    console.log(error);
                })
            Coupons.getCoupon(id)
                .success(function(data){
                    $scope.coupon = data;
                })
                .error(function(error){
                    console.log(error);
                });

            Logs.getLogs(id)
                .success(function(data){
                    $scope.log = {
                        mobileViews: 0,
                        webViews: 0,
                        totalViews: data.count,
                        data: data.logs                       
                    }
                    console.log(data);
                    data.logs.forEach(function(item){
                        if(item.action === 'mobile'){ $scope.log.mobileViews += 1;}
                        if(item.action === 'web'){ $scope.log.webViews += 1;}
                    })
                })
                .error(function(error){
                    console.log(error);
                })                
        };
        
        $scope.init();
    }
})();