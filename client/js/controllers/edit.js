(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('editCtrl', editCtrl);

    editCtrl.$inject = ['$scope', 'Coupons', '$state', '$timeout', '$stateParams', 'Upload'];

    /* @ngInject */
    function editCtrl($scope, Coupons, $state, $timeout, $stateParams, Upload){
        //Page Variables
        var id = $stateParams.id
        
        $scope.location = '';
        $scope.places = [];
        $scope.coupon = {};
        $scope.init = init;
        

        //Initialize
        function init(){
            Coupons.getCoupon(id)
                .success(function(data){
                    $scope.coupon = data;
                })
                .error(function(){
                    console.log(error);
                })
        };
        
        
        
        //Address Configuration
        $scope.showAddress = false;
        $scope.addressButton = 'Add Address';
        $scope.toggleAddress =  function(){
            $scope.showAddress = !$scope.showAddress;
        };
        
        
        $scope.removeLocation = function($index){
            $scope.coupon.locations.splice($index, 1);
        };
        
        
        //Dropzone Configuration
        /*
        $scope.showDropzone = false;
        $scope.fileAdded = false;
        $scope.partialDownloadLink = 'http://localhost:3000/uploads/';
        $scope.filename = '';

        
        $scope.toggleDropzone =  function(){
            $scope.showDropzone = !$scope.showDropzone;
        };
        $scope.uploadFile = function() {
            $scope.processQueue();
        };

        $scope.reset = function() {
            $scope.resetDropzone();
            $scope.coupon.img = '';
            $scope.coupon.hasImage = false;
        };
        */

        $scope.uploadLogo = function(file, errFiles) {

            $scope.logo = file;
            console.log('Uploading Logo');

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/uploads',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(response.data);
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * 
                                             evt.loaded / evt.total));
                });
            }   
        }

        $scope.uploadImg = function(file, errFiles) {

            $scope.img = file;
            console.log('Uploading Image');

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/uploads',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(response.data);
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * 
                                             evt.loaded / evt.total));
                });
            }   
        }


        
        //Save Coupon
        $scope.updateCoupon = function(){
            console.log('Updating Coupon');
            console.log($scope.coupon);
            if($scope.img){
                $scope.coupon.img = $scope.img.name;

            }

            if($scope.logo){
                $scope.coupon.vendor_logo = $scope.logo.name;
            }          

            Coupons.updateCoupon($scope.coupon)
                .success(function(data){
                     $state.go('home');
                })
                .error(function(error){
                    
                })
        }
        
        $scope.init();
    }
})();