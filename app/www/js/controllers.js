var debug = true;
var newsSelected = false;



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

.controller('NewsController', function($scope, $http,$cordovaNetwork,$ionicLoading,$ionicPopover){


  var template = '<ion-popover-view><ion-header-bar>' +
    ' <h1 class="title">Выбор факультета</h1>' +
    ' </ion-header-bar> <ion-content>' +
    '<button class="button button-full button-positive" ng-click="newsFbto();closePopover();">ФБТО</button> <br/>'+
    '<button class="button button-full button-stable" ng-click="closePopover();">ФЗО</button> <br/>'+
    '<button class="button button-full button-calm" ng-click="newsFist();closePopover()">ФИСТ</button> <br/>' +
    '</ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });


  $scope.newsFist = function(){
    showLoad($ionicLoading);
    loadNews($http,$cordovaNetwork,'http://fist.psuti.ru/index.php?format=feed&type=rss',function(data){
    var dataredy = data.responseData;
    dataredy.feed.entries.shift();
    $scope.rss = dataredy;
    $ionicLoading.hide();
    newsSelected = 'fist';
      showName();

  });};

  $scope.newsFbto = function(){
    showLoad($ionicLoading);
    loadNews($http,$cordovaNetwork,'http://fbto.psuti.ru/feeds/fbto.rss',function(data){
    $scope.rss = data.responseData;
    $ionicLoading.hide();
    newsSelected = 'fbto';
      showName();

  });};

  function showName(){
    switch (newsSelected){
      case 'fist': $scope.newsSelected = 'ФИСТ'; break;
      case 'fbto': $scope.newsSelected = 'ФБТО';break;
      case 'fzo': $scope.newsSelected = 'ФЗО';break;
    }
  }
  if(newsSelected == 'fist'){
    $scope.newsFist();
  }else if (newsSelected  == 'fbto'){
    $scope.newsFbto();
  }else if(!newsSelected || newsSelected == '') {
    $scope.newsFist();
  }

  ///FBTO - http://fbto.psuti.ru/feeds/fbto.rss
  ///FIST - http://fist.psuti.ru/index.php?format=feed&type=rss
  ///
})
.controller('VektorCotroller', function($scope, $http,$cordovaNetwork,$ionicLoading){
  showLoad($ionicLoading);
  loadUrlData($http,$cordovaNetwork,'http://abitur.psuti.ru/api/get_specialty_section_list.php',function(data){
    $scope.data = data;
    $ionicLoading.hide();
  });
})

.controller('commisController',function($scope, $cordovaInAppBrowser){
  $scope.mapShow = function(){
    var device = ionic.Platform.platform();
    if(device === 'ios') {
      appAvailability.check(
        'geo://', // URI Scheme
        function() {  // Success callback
          window.open('geo://53.2268255,50.199395', '_system', 'location=no');
          console.log('map is available');
        },
        function() {  // Error callback
          window.open('https://www.google.ru/maps/place/53%C2%B013\'32.2%22N+50%C2%B011\'38.5%22E/@53.225618,50.1918423,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0', '_system', 'location=no');
          console.log('map is not available');
        }
      );
    }
    else if(device === 'android') {
      appAvailability.check(
        'geo://', // URI Scheme
        function() {  // Success callback
          window.open('geo://53.2268255,50.199395', '_system', 'location=no');
          console.log('map is available');
        },
        function() {  // Error callback
          window.open('https://www.google.ru/maps/place/53%C2%B013\'32.2%22N+50%C2%B011\'38.5%22E/@53.225618,50.1918423,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0', '_system', 'location=no');
          console.log('map is not available');
        }
      );
    }else{
      window.open('https://www.google.ru/maps/place/53%C2%B013\'32.2%22N+50%C2%B011\'38.5%22E/@53.225618,50.1918423,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0', '_system', 'location=no');
    }
  };

})

.controller('VektorCotrollerd', function($scope,$http, $stateParams,$cordovaNetwork,$ionicLoading) {

  showLoad($ionicLoading);
  loadUrlData($http,$cordovaNetwork,'https://abitur.psuti.ru/api/get_specialty_list.php',function(data){
  var dataresult = [];
    for(var i = 1; i < data.length;i++){
      if(data[i].sid = $stateParams.id)
      dataresult.push(data[i]);
    }
    $scope.data = dataresult;
    $ionicLoading.hide();
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



function checkInternet($http,$cordovaNetwork,yesCall,notCall){
  var device = ionic.Platform.platform();
  console.log(device);
  if(device == 'win32')
  {
    yesCall();
    return;
  }else{
    console.log(navigator);
    console.log($cordovaNetwork);
    if($cordovaNetwork.isOnline()){
      if(debug) console.log('have internet');
      yesCall();
    }else {
      if(debug) console.log('dont have internet');
      notCall();
    }
    //else notCall();
  }

}

function loadNews($http,$cordovaNetwork,url,callback){
  checkInternet($http,$cordovaNetwork,function(){
    //*****have***////
    $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' +
      url).
    success(function(data){
      localStorage.setItem(url,JSON.stringify(data));
      callback(data);
    }).
    error(function(err){
      if(debug) console.log(err);
    });
  },function(){
    //nothave
    var data = localStorage.getItem(url);
    callback(JSON.parse(data));
  })
}

function loadUrlData($http,$cordovaNetwork,url,callback){
  checkInternet($http,$cordovaNetwork,function(){
    //*****have***////
    $http.get(url).
    success(function(data){
      localStorage.setItem(url,JSON.stringify(data));
      callback(data);
    }).
    error(function(err){
      if(debug) console.log(err);
    });
  },function(){
    //nothave
    var data = localStorage.getItem(url);
    callback(JSON.parse(data));
  })
}

function showLoad($ionicLoading){
  $ionicLoading.show({
    template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>',
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
}
