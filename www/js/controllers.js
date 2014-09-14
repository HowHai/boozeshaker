var controllers = angular.module('Booze.controllers', []);

controllers.controller('MainCtrl', function($scope, ShakeDetection) {

  $scope.cocktails = {};

  function myCallBack() {
    $http.get('lib/data/cocktails.json').success (function(data){
      $scope.cocktails.random = data[Math.floor(Math.random() * data.length)];
    });
  }

  $scope.watchShake = function() {
    ShakeDetection.startWatch(myCallBack);
  }

  $scope.stopWatch = function() {
    ShakeDetection.stopWatch();
  }
});

controllers.controller('DetailCtrl', function($scope, $state) {

});