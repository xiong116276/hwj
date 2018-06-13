//area
var setarea = function (width,height) {

  var arr = [
    [55,122,172,200,240,318,441,515,557,586,633,703],
    [168,281,302,413,433,545]
  ];
  for(let i = 0,m = 0,n = 0;i<$(".area").length;i++) {
    var a = arr[0][m]/750*width;
    var b = arr[1][n]/655*height;
    var c = arr[0][m+2]/750*width;
    var d = arr[1][n+1]/655*height;

    if(i<4||i>5){
      $($(".area")[i]).attr("coords",a+","+b+","+c+","+d);
      m = m + 3;
    }else{
      c = arr[0][m+3]/750*width;
      $($(".area")[i]).attr("coords",a+","+b+","+c+","+d);
      m = m + 6;
    }
    if(i === 3){
      m = 1;
      n = 2;
    }else if(i === 5){
      m = 0;
      n = 4;
    }
  };
};

