angular.module('Booze.controllers', [])

.controller('MainCtrl', function($scope, $cordovaDeviceMotion, $cordovaDialogs, ShakeDetection) {

  function myCallBack() {
    $cordovaDialogs.alert('It shaked!');
  }

  $scope.watchShake = function() {
    ShakeDetection.startWatch(myCallBack);
  }

  $scope.stopWatch = function() {
    ShakeDetection.stopWatch();
  }
})
