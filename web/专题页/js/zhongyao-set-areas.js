//设置area锚点区域
var setarea = function (width,height) {

  var arr = [
    [0,0.2,0.4,0.6,0.8,1],
    [0,0.25,0.5,0.75,1]
  ];

  for(var i = 0,n = 0,m = 0;i<$(".area").length;i++){

    var a = arr[0][m]*width;
    var b = arr[1][n]*height;
    var c = arr[0][m+1]*width;
    var d = arr[1][n+1]*height;

    $($(".area")[i]).attr("coords",a+","+b+","+c+","+d);

    if((i+1)%5!==0){
      m++;
    }else {
      n++;
      m = 0;
    }
  }
}