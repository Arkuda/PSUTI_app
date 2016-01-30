angular.module('datefilter', []).filter('datefilter', function() {
  return function(input) {
    //Mon, 28 Dec 2015 11:20:00 -0800
    //  0 |1 | 2 |  3 |    4   |  5
    //jan - feb - mar - apr - may - jun - jul - aug - sep - oct - nov - dec

    var mass=  input.split(' ');
    var result  = [];
    result[0] = mass[1];
    result[2] = mass[3];
    result[3] = mass[4];

    switch (mass[2])
    {
      case 'Jan': result[1] = 'янв'; break;
      case 'Feb': result[1] = 'фев'; break;
      case 'Mar': result[1] = 'мар'; break;
      case 'Apr': result[1] = 'апр'; break;
      case 'May': result[1] = 'май'; break;
      case 'Jun': result[1] = 'июн'; break;
      case 'Jul': result[1] = 'июл'; break;
      case 'Aug': result[1] = 'авг'; break;
      case 'Sep': result[1] = 'сен'; break;
      case 'Oct': result[1] = 'окт'; break;
      case 'Nov': result[1] = 'ноя'; break;
      case 'Dec': result[1] = 'дек'; break;
      default: result[1] = 'ххх';
    }
    return result[0] +" "+ result[1] +" "+result[2] +" "+result[3] ;
  };
});
