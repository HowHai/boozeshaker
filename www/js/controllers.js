var controllers = angular.module('Booze.controllers', []);

controllers.controller('MainCtrl', function($scope, ShakeDetection, CockTail, $state, $ionicPlatform) {

  $ionicPlatform.ready(function(){
    ShakeDetection.startWatch(myCallBack);
  });

  function myCallBack() {
    CockTail.getOneRandom().then(function(response) {
      var cocktail = response.data;

      $state.go('cocktail.detail', {id: cocktail.id});
    });
  }
});

controllers.controller('DetailCtrl', function($scope, $state, CockTail, $stateParams, cocktailData) {
    $scope.cocktail = cocktailData;
});