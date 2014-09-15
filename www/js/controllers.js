var controllers = angular.module('Booze.controllers', []);

controllers.controller('MainCtrl', function($scope, ShakeDetection, CockTail, $state) {

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

  $scope.getCocktail = function() {
    // $state.go('cocktail.detail', {id: 1});
  }

});

controllers.controller('DetailCtrl', function($scope, $state, CockTail, $stateParams) {
  // $scope.cockTail = CockTail.getOne($stateParams.id);
});