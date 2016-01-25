(function() {
    'use strict';

    angular
        .module('coupon')
        .controller('newCtrl', newCtrl);

    newCtrl.$inject = ['$scope', 'Coupons', 'Vendors', '$state', '$timeout', 'Upload'];

    /* @ngInject */
    function newCtrl($scope, Coupons, Vendors, $state, $timeout, Upload){
        //Page Variables
        $scope.location = '';
        $scope.places = [];
        $scope.coupon = {
            title: '',
            desc: '',
            desc2: '',
            code: '',
            footer: '',
            active: false,
            hasImage: false,
            img: '',
            category:[],
            locations: [],
            island: '',
            expiration: new Date(),
            expires: true,
            premium:false,
            vendor: '',
            vendor_url: '',
            vendor_phone: '',
            vendor_logo: '',
        };
        
        $scope.uploadLogo = function(file, errFiles) {
            $scope.logo = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/uploads',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
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
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/uploads',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
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
        
        //Save Coupon
        $scope.saveCoupon = function(){
            if($scope.filename){
                $scope.coupon.img = $scope.filename;
            }

            if($scope.img){
                $scope.coupon.img = $scope.img.name;

            }

            if($scope.logo){
                $scope.coupon.vendor_logo = $scope.logo.name;
            }

            Coupons.postCoupon($scope.coupon)
                .success(function(data){
                    $state.go('home');
                })
                .error(function(error){
                    console.log('Error');
                    //$state.go('home');
                })
        }
        
    }
})();