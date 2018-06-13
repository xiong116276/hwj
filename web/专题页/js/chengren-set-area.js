var setarea = function (width,height) {
  //            area
  var c = 70/750*width;
  var b = 180/750*width;
  var a = 0;
  for (var i = 0;i<$(".area").length;i++){
    a = 0.2*(i+1)*width;
    $($(".area")[i]).attr("coords",a+","+b+","+c);
  }
}