$(function () {
  $("#area").on("click",".area",function () {
    var n = $(this).index();
    $($(".family-top-items")[n]).addClass("active").siblings("[class~='active']").removeClass("active").children().children(".family-top-coordinate").addClass("hide");
    $($(".family-top-items")[n]).children().children(".family-top-coordinate").removeClass("hide");

    var width = parseFloat($(".family-top-items").css("width"));
    $(".male-top")[0].scrollLeft=width*n;

  });
//    锚点
  $(".family-top-box").on("click",".family-top-items", function () {
    var index = $(this).index();
    $(".family-items-content")[index].scrollIntoView();
  });
//    点击改变样式
  $(".family-top-box").on("click",".family-top-items", function () {
    $(this).addClass("active").siblings("[class~='active']").removeClass("active").children().children(".family-top-coordinate").addClass("hide");
    $(this).children().children(".family-top-coordinate").removeClass("hide");
  });
});
//            area
var setarea = function () {
  var img = getComputedStyle($(".top-banner")[0]);
  var width = parseFloat(img.width);
  var height = parseFloat(img.height);
  var x1 = 55/750*width,x2 = 122/750*width,x3 = 172/750*width,x4 = 200/750*width,
    x5 = 240/750*width,x6 = 318/750*width,x7 = 441/750*width,x8 = 515/750*width,
    x9 = 557/750*width,x10 = 586/750*width,x11 = 633/750*width,x12 = 703/750*width;
  var y1 = 168/655*height,y2 = 281/655*height,y3 = 302/655*height,y4 = 413/655*height,
    y5 = 433/655*height,y6 = 545/655*height;
  $($(".area")[0]).attr("coords",x1+","+y1+","+x3+","+y2);
  $($(".area")[1]).attr("coords",x4+","+y1+","+x6+","+y2);
  $($(".area")[2]).attr("coords",x7+","+y1+","+x9+","+y2);
  $($(".area")[3]).attr("coords",x10+","+y1+","+x12+","+y2);
  $($(".area")[4]).attr("coords",x2+","+y3+","+x5+","+y4);
  $($(".area")[5]).attr("coords",x8+","+y3+","+x11+","+y4);
  $($(".area")[6]).attr("coords",x1+","+y5+","+x3+","+y6);
  $($(".area")[7]).attr("coords",x4+","+y5+","+x6+","+y6);
  $($(".area")[8]).attr("coords",x7+","+y5+","+x9+","+y6);
  $($(".area")[9]).attr("coords",x10+","+y5+","+x12+","+y6);
}

var setgoods = function (arr) {
  var title = arr[0].itemstitle;
  var areaid = arr[0].itemsareaid;
  var detail = arr[0].itemsdetail;

  var fragmenttitle = document.createDocumentFragment();
  var fragmentareas = document.createDocumentFragment();
  var fragmentdetail = document.createDocumentFragment();

  for(var i = 0; i< title.length ; i++){
    // 导航栏
    var item = document.createElement("div");
    item.setAttribute("class",arr[1]);
    var itemcontent = document.createElement("div");
    itemcontent.setAttribute("class",arr[2]);
    itemcontent.innerHTML="<i class='"+arr[3]+" hide'></i>"+title[i];
    item.appendChild(itemcontent);
    fragmenttitle.appendChild(item);

    // area跳转
    var area = document.createElement("area");
    area.setAttribute("class","area");
    area.setAttribute("shape",arr[4]);
    area.setAttribute("href","#"+areaid[i]);
    fragmentareas.appendChild(area);
    // goods详情
    var itemscontent = document.createElement("div");
    itemscontent.setAttribute("id",areaid[i]);
    itemscontent.setAttribute("class",arr[5]);

    // header图片
    var itemsheader = document.createElement("div");
    itemsheader.setAttribute("class",arr[6]);
    itemsheader.innerHTML="<img src='images/family-standing/family-standing-items-0"+(i+1)+".png'>";
    itemscontent.appendChild(itemsheader);

    // 商品容器
    var itemsbox = document.createElement("div");
    itemsbox.setAttribute("class",arr[7]+" after");
    itemscontent.appendChild(itemsbox);

    // 商品列表
    var list = arr[0].itemsdetail[i].goodslist;
    for(var j = 0;j<list.length;j++){
      // 创建一个商品
      var itemsgoods = document.createElement("div");
      itemsgoods.setAttribute("class","items-goods");
      // 创建一个可以跳转的容器
      var goodsbox = document.createElement("a");
      // 创建一个图片容器
      var goodsimgbox = document.createElement("div");
      goodsimgbox.setAttribute("class","items-goods-img");
      // 创建一个图片
      var goodsimg = document.createElement("img");
      // 创建一个产品详情容器
      var goodsdetail = document.createElement("div");
      goodsdetail.setAttribute("class","items-info");
      goodsbox.setAttribute("href",list[j].url);
      goodsimg.setAttribute("class","lazy");
      goodsimg.setAttribute("data-original",list[j].pictureurl);
      // 懒加载
      $(goodsimg).lazyload();
      goodsdetail.innerHTML=
        "<div class='items-goods-name'>"+list[j].name+"</div>\n" +
        "<div class='items-goods-price'>\n" +
        "   <small>￥</small>"+list[j].price+"\n" +
        "</div>\n" +
        "<div class='"+arr[8]+"'>点击查看</div>";
      // 将图片加入图片容器中
      goodsimgbox.appendChild(goodsimg);
      // 将图片容器加入跳转容器
      goodsbox.appendChild(goodsimgbox);
      // 将产品详情容器加入跳转容器
      goodsbox.appendChild(goodsdetail);
      // 将跳转容器加入商品元素中
      itemsgoods.appendChild(goodsbox);
      // 将一个商品加入商品容器
      itemsbox.appendChild(itemsgoods);
    }
    // 将所有商品加入文档片段中
    fragmentdetail.appendChild(itemscontent);
  }

  $(arr[9]).css("width", 7 * title.length + "rem");
  $(arr[9]).append(fragmenttitle);
  $("#area").append(fragmentareas);
  setarea();
  $(".container").append(fragmentdetail);
}
window.onload=function () {
  $.ajax( {
    type: 'GET',
    url: 'data/family-test.json',
    dataType:"json",
    success: function (data) {

      var arr = [
                data,"family-top-items","male-top-content","family-top-coordinate",
                  "rect","family-items-content","adult-items-header1","female-items-box",
                "family-items-btn",".family-top-box"
                ];
      setgoods(arr);
    }
  });
}
//返回顶部按钮
function gotoTop(min_height){
  $("#gotoTop").click(
    function(){
      $('html,body').animate({scrollTop:0},500);
    }
    ).hover(
    function(){
      $(this).addClass("hover");
      },
    function(){
      $(this).removeClass("hover");
    }
    );
  min_height ? min_height = min_height : min_height = 500;
  $(window).scroll(function(){
    var s = $(window).scrollTop();
    if( s > min_height){
      $("#gotoTop").fadeIn(100);
    }else{
      $("#gotoTop").fadeOut(200);
    };
  });
};
gotoTop();


