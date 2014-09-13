angular.module('Booze.controllers', [])

.controller('MainCtrl', function($scope, $cordovaDeviceMotion, $cordovaDialogs) {
  $scope.getAcceleration = function () {
    $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });
  };

  $scope.watchAcceleration = function () {
    // Update every 3 seconds for 1 minute
    var options = {
      maximumAge: 3000,
      timeout: 60 * 1000,
      enableHighAccuracy: true
    };

    watch = $cordovaDeviceMotion.watchAcceleration(options);

    watch.promise.then(
      function() {/* unused */},
      function(err) {},
      function(acceleration) {
        $cordovaDialogs.alert('Acceleration X: ' + acceleration.x + '\n' +
           'Acceleration Y: ' + acceleration.y + '\n' +
           'Acceleration Z: ' + acceleration.z + '\n' +
           'Timestamp: '      + acceleration.timestamp + '\n');
    });
  };

  $scope.clearWatch = function() {
    // use watchID from watchAccelaration()

    if(!watch) { return; }

    $cordovaDeviceMotion.clearWatch(watch.watchId).then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user

    });
  }
})
