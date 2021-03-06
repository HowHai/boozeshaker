var services = angular.module('Booze.services', [])

/**
 * A service that detects a shake, then runs a callback function.
 */
services.factory('ShakeDetection', function($cordovaDeviceMotion, $cordovaDialogs, CockTail, $state) {
  var shake = {},
      watchId = null,
      options = {
        frequency: 100
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

        setTimeout(function() {
          shake.startWatch(myCallBack);
        }, 3000);

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

    // Callback
    function myCallBack() {
      CockTail.getOneRandom().then(function(response) {
        var cocktail = response.data;

        $state.go('cocktail.detail', {id: cocktail.id});
      });
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
    var promise;

    promise = $http.get(cocktailsDataUrl, {
      transformResponse: returnOneRandomCocktail
    }).success (function(data){
      return data;
    });

    return promise;
  }

  CockTail.getOne = function(id) {
    var promise;

    promise = $http.get(cocktailsDataUrl, {
      transformResponse: function(response) {
        var result,
        data = angular.fromJson(response);

        angular.forEach(data, function(cocktail) {
          if (cocktail.id == id) {
            result = cocktail;
          };
        });

        return result;
      }
    }).success (function(data){
      return data;
    });

    return promise;
  }

  function returnOneRandomCocktail(response) {
    var result,
        response = angular.fromJson(response);

    result = response[Math.floor(Math.random() * response.length)];

    return result;
  }

  return CockTail;
});
