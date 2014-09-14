var services = angular.module('Booze.services', [])

/**
 * A service that detects a shake, then runs a callback function.
 */
services.factory('ShakeDetection', function($cordovaDeviceMotion, $cordovaDialogs) {
  var shake = {},
      watchId = null,
      options = {
        frequency: 3000
      },
      previousAcceleration = { x: null, y: null, z: null },
      shakeCallBack = null;

    // Start watching the accelerometer for a shake gesture
    shake.startWatch = function (onShake) {
      if (onShake) {
        shakeCallBack = onShake;
      }
      watchId = $cordovaDeviceMotion.watchAcceleration(options);

      watchId.promise.then(
        function() {/* unused */},
        handleError,
        assessCurrentAcceleration
      );
    };

    // Stop watching the accelerometer for a shake gesture
    shake.stopWatch = function () {
      if (watchId !== null) {
        $cordovaDeviceMotion.clearWatch(watchId);
        watchId = null;
      }
    };

    // Assess the current acceleration parameters to determine a shake
    function assessCurrentAcceleration(acceleration) {
      var accelerationChange = {};
      if (previousAcceleration.x !== null) {
        accelerationChange.x = Math.abs(previousAcceleration.x, acceleration.x);
        accelerationChange.y = Math.abs(previousAcceleration.y, acceleration.y);
        accelerationChange.z = Math.abs(previousAcceleration.z, acceleration.z);
      }
      if (accelerationChange.x + accelerationChange.y + accelerationChange.z > 30) {
        // Shake detected
        if (typeof (shakeCallBack) === "function") {
          shakeCallBack();
        }
        shake.stopWatch();
        setTimeout(shake.startWatch, 1000);
        previousAcceleration = {
          x: null,
          y: null,
          z: null
        }
      } else {
        previousAcceleration = {
          x: acceleration.x,
          y: acceleration.y,
          z: acceleration.z
        }
      }
    }

    // Handle errors here
    function handleError() {
    }

    return shake;
});


/**
 * A service to retrieve cocktail.
 */
services.factory('CockTail', function($http) {
  var CockTail = {},
      cocktailsDataUrl = 'lib/data/cocktails.json';

  CockTail.getOneRandom = function() {
    $http.get(cocktailsDataUrl).success (function(data){
      return data[Math.floor(Math.random() * data.length)];
    });
  }

  return CockTail;

});