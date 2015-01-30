// another good example of signing pad w/out a directive: http://codepen.io/jdnichollsc/pen/cJvLi
angular.module('app', ['ionic'])

.run(
  function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
)

.controller('AppCtrl',
    function($scope, $rootScope) {

        var app = this;

        console.log("app controller");

        app.signature = {};

        app.close = function(){
          if (app.signature.isEmpty()) {
              app.showRequiredMsg = true;
          } else {
              app.hasSignature = true;
          }
        }


    }
)
;