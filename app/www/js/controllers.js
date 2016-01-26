var isDebug = true;

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('NewsController', function($scope, $http){
  loadNews($http,'http://fist.psuti.ru/index.php?format=feed&type=rss',function(data){
    $scope.rss = data;
  });
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
  .filter('unsafe', function($sce) {
  return function(val) {
    return $sce.trustAsHtml(val);
  };
});
////UTILITES//////UTILITES////////UTILITES////////UTILITES//////

function log(text){
  if(isDebug){
    console.log(text);
  }
}

function checkInternet(yesCall,notCall){
  if (typeof(navigator.connection) == "undefined")
  {
    yesCall();
    return;
  }else {
    var networkState = navigator.connection.type;
    if( networkState != Connection.NONE)
    {
      log('have internet');
      yesCall();
    }
    else{
      log('dont have internet');
      notCall();
    }
  }

}

function loadNews($http,url,callback){
  checkInternet(function(){
    //*****have***////
    $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' +
      url).
    success(function(data){
      localStorage.setItem(url,data.responseData);
      callback(data.responseData);
    }).
    error(function(err){
      log(err);
    });
  },function(){
    //nothave
    callback(localStorage.getItem(url));
  })
}
