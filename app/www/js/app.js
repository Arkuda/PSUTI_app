// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'datefilter','ngCordova','ionic-material'])
  .constant('ApiEndpoint', {
    url: 'http://localhost:8100/api'
  })
  // For the real endpoint, we'd use this
  // .constant('ApiEndpoint', {
  //  url: 'http://cors.api.com/api'
  // })
.run(function($ionicPlatform,$cordovaLocalNotification,$http,$cordovaNetwork) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    /*var push = new Ionic.Push({
      "debug": true
    });

    push.register(function(token) {
      console.log("Device token:",token.token);
    });*/
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.configure({
      //silent: true
    });
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.onactivate = function () { console.log('run notif emmiter on app.js'); notifEmmiter($cordovaLocalNotification,$cordovaNetwork,$http); };


  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.news', {
      url: '/news',
      views: {
        'menuContent': {
          templateUrl: 'templates/news.html',
          controller: 'NewsController'
        }
      }
    })
    .state('app.newsfromfaculty', {
      url: '/news/:faculty',
      views: {
        'menuContent': {
          templateUrl: 'templates/news.html',
          controller: 'NewsController'
        }
      }
    })
    .state('app.profile', {
        url: '/profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController'
          }
        }
      })
    .state('app.vektors', {
      url: '/vektors',
      views: {
        'menuContent': {
          templateUrl: 'templates/vektors.html',
          controller: 'VektorCotroller'
        }
      }
    })
    .state('app.vektorsCorrect', {
      url: '/vektors/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/vektorsCorrect.html',
          controller: 'VektorCotrollerd'
        }
      }
    }).state('app.commis', {
      url: '/commis',
      views: {
        'menuContent': {
          templateUrl: 'templates/commis.html',
          controller: 'commisController'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
