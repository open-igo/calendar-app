// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('igoApp', ['ionic','igoApp.controllers','uiGmapgoogle-maps','ngAnimate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    ionic.Platform.fullScreen();
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    /*
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
    */
  });
})

.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('top',{
    url: '/top',
    templateUrl:'templates/top.html',
    controller:'topCtrl'
  })
  .state('search',{
    url: '/search',
    templateUrl:'templates/search.html',
    controller:'searchCtrl'
  })
  .state('detail',{
    url: '/search/:idx',
    templateUrl:'templates/detail.html',
    controller:'detailCtrl'
  });

  $urlRouterProvider.otherwise('/top');
});
