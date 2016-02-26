
///FBTO - http://fbto.psuti.ru/feeds/fbto.rss
///FIST - http://fist.psuti.ru/index.php?format=feed&type=rss


function notifEmmiter($cordovaLocalNotification,$cordovaNetwork,$http) {
  /*$rootScope.$on('$cordovaLocalNotification:click',
    function (event, notification, state) {
      if(notification.data.url == 'http://fist.psuti.ru/index.php?format=feed&type=rss')
      {
        //fist
        window.open('#/app/news/fist', '_self', 'location=no');
      }
      else {
        //fbto
        window.open('#/app/news/fbto', '_self', 'location=no');
      }
    });*/
  setTimeout(function () {
    haveNewNews($http,$cordovaNetwork,$cordovaLocalNotification,'http://fbto.psuti.ru/feeds/fbto.rss','ФБТО');
    haveNewNews($http,$cordovaNetwork,$cordovaLocalNotification,'http://fist.psuti.ru/index.php?format=feed&type=rss','ФИСТ');
  }, 5000);

}




function haveNewNews($http,$cordovaNetwork,$cordovaLocalNotification,url,faculty){
  loadNews($http, $cordovaNetwork,url,function(data){
    if (data !=  localStorage.getItem(url))
    {
    if(url == 'http://fist.psuti.ru/index.php?format=feed&type=rss'){
      data.responseData.feed.entries.shift();
    }
      console.log('data');
      console.log(data);

      $cordovaLocalNotification.add({
                  id: "1234",
             //     date: Date(Date.now()+10),
                  message: data.responseData.feed.entries[0].title,
                  title: "ПГУТИ:" + faculty + " Добавлена новая новость",
                  autoCancel: false,
                  sound: true,
                  icon: "res://www/img/logo.jpg",
                  data: {url:url}
              }).then(function () {
                  console.log("The notification has been set");
              });
    }
  });
}
