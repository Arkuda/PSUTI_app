var logBak = console.log;
var errBak = console.error;

var logMessages = [];
var errMessages = [];


document.addEventListener("deviceready", checkErrors, false);

function checkErrors(){
  if(typeof localStorage.getItem('haveErrMessages') == 'undefined')
      clearStorage();

  if(localStorage.getItem('haveErrMessages') == true && isOnline()){
    var log = localStorage.getItem('errMessages');
    var fb = new Firebase("https://arkbugtrack.firebaseIO.com/error");
    fb.push(log);
    clearStorage();
  }
}

function sendError(val){
  if(val != 'No Content-Security-Policy meta tag found. Please add one when using the cordova-plugin-whitelist plugin. ') {
  if(isOnline())
  {
    var fb = new Firebase("https://arkbugtrack.firebaseIO.com/error");
    var data = generateErrorLog(val);
    fb.push(data);
    clearStorage();
  }else {
    errMessages.push(generateErrorLog(val));
    localStorage.setItem('haveErrMessages',true);
    localStorage.setItem('errMessages',JSON.stringify(errMessages));
  }
}}
function  clearStorage(){
  localStorage.setItem('haveErrMessages',false);
  localStorage.setItem('errMessages',[]);
}

function generateErrorLog(val){
  console.log('GENT ERROR');
  var error = [];
  var date = Date(Date.now());
  error.app = 'PGUTI';
  error.ua = ionic.Platform.ua;
  error.time = date;
  error.message = val;
  error.haveInternet = isOnline();
  error.path = document.documentURI;
  console.log(error);
  return error;
}
/*
console.log = function(value) {
  logMessages.push(value);
  logBak.call(console, value);
};

console.error = function(value) {
  //errMessages.push(value);
  sendError(value);
  errBak.call(console, value);
};
*/
var isOnline = function () {
    var networkState = navigator.connection.type;
    return networkState !== Connection.UNKNOWN && networkState !== Connection.NONE;


}
//firebase https://arkbugtrack.firebaseIO.com
