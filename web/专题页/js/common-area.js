var goods = {
  // 创建元素模板函数
  buildElement:function (tag,attrs,html) {
    var element = document.createElement(tag);
    // 判断第二个参数是属性还是内容
    if(typeof(attrs) === "string"){
      html = attrs;
      attrs = null;
    }
    // 判断是否有属性
    if(attrs !== undefined){
      for(var attr in attrs){
        element.setAttribute(attr,attrs[attr]);
      }
    }
    // 判断是否有内容
    if(html !== undefined){
      element.innerHTML = html;
    }
    return element;
  },
  // 设置导航栏
  setnav : function (obj) {
    // 导航栏锚点和样式
    $("."+obj.navtopbox).on("click","."+obj.navtopitem, function () {
      // 锚点
      var index = $(this).index();
      $("."+obj.goodsitem)[index].scrollIntoView();
      // 样式
      $(this).addClass("active").siblings("[class~='active']").removeClass("active")
        .children().children("."+obj.coordinate).addClass("hide");
      $(this).children().children("."+obj.coordinate).removeClass("hide");
    });
    // area区域与导航栏对应
    function anchor() {
      var n = $(this).index();
      $($("."+obj.navtopitem)[n]).addClass("active").siblings("[class~='active']").removeClass("active")
        .children().children("."+obj.coordinate).addClass("hide");
      $($("."+obj.navtopitem)[n]).children().children("."+obj.coordinate).removeClass("hide");

      var width = parseFloat($("."+obj.navtopitem).css("width"));
      $("."+obj.navtopcontainer)[0].scrollLeft=width*n;
      $("."+obj.goodsitem)[n].scrollIntoView();
    }
   if($("#area").length>0){
     // area区域锚点与相对应的导航
     $("#area").on("click",".area",anchor);
   }else{
    $("."+obj.topclassify).on("click",anchor);
   }
  },

  // 设置商品详情
  setgoods: function (obj) {
    var title = obj.goodsdata.itemstitle;
    var areaid = obj.goodsdata.itemsareaid;
    var detail = obj.goodsdata.itemsdetail;

    var fragmenttitle = document.createDocumentFragment();
    var fragmentareas = document.createDocumentFragment();
    var fragmentdetail = document.createDocumentFragment();

    for(var i = 0; i< title.length ; i++){
      // 导航栏
      var item = this.buildElement("div",{"class":obj.navtopitem});
      var itemcontent = this.buildElement(
        "div",
        {
          "class":obj.navcoordinatebox
        },
        "<i class='"+obj.coordinate+" hide'></i>"+title[i]
        );
      item.appendChild(itemcontent);
      fragmenttitle.appendChild(item);

      // area跳转
      var area = this.buildElement(
        "area",
        {
          "class":"area",
          "href":"#"+areaid[i],
          "shape":obj.areashape
        }
      );
      fragmentareas.appendChild(area);

      // goods详情
      var itemscontent = this.buildElement(
        "div",
        {
          "id":areaid[i],
          "class":obj.goodsitem
        }
      );

      // header图片
      var itemsheader = this.buildElement(
        "div",
        {
          "class":obj.goodsitemheader
        },
        "<images src='images/"+obj.goodspicturefile+"/"+obj.goodsheaderpicture+"-0"+(i+1)+".png'>"
      );
      itemscontent.appendChild(itemsheader);

      // 商品容器
      var itemsbox = this.buildElement("div",{"class":obj.goodsitembox+" after"});
      itemscontent.appendChild(itemsbox);

      // 商品列表
      var list = obj.goodsdata.itemsdetail[i].goodslist;
      for(var j = 0;j<list.length;j++){
        // 创建一个商品
        var itemsgoods = this.buildElement("div",{"class":"items-goods"});
        // 创建一个可以跳转的容器
        var goodsbox = this.buildElement("a",{"href":list[j].url});
        // 创建一个图片容器
        var goodsimgbox = this.buildElement("div",{"class":"items-goods-images"});
        // 创建一个图片
        var goodsimg = this.buildElement("img",{"class":"lazy","data-original":list[j].pictureurl});
        // 创建一个产品详情容器
        var goodsdetail = this.buildElement(
          "div",
          {"class":"items-info"},
          "<div class='items-goods-name'>"+list[j].name+"</div>\n" +
          "<div class='items-goods-price'>\n" +
          "   <small>￥</small>"+list[j].price+"\n" +
          "</div>\n" +
          "<div class='"+obj.goodsbtn+"'>点击查看</div>"
          );
        // 懒加载
        $(goodsimg).lazyload();
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
    // 设置导航栏宽度
    $("."+obj.navtopbox).css("width", obj.navtopitemwidth * title.length + "rem");
    $("."+obj.navtopbox).append(fragmenttitle);

    if($("#area").length>0){
      $("#area").append(fragmentareas);
      var img = getComputedStyle($(".top-banner")[0]);
      var width = parseFloat(img.width);
      var height = parseFloat(img.height);
      setarea(width,height);
    }
    $(".container").append(fragmentdetail);
  },

  //返回顶部按钮
  gotoTop:function(obj){
    $("#gotoTop").css("background-color","rgba("+obj.gotopbtn+")");

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
    obj.minheight ? obj.minheight = obj.minheight : obj.minheight = 500;
    $(window).scroll(function(){
      var s = $(window).scrollTop();
      if( s > obj.minheight){
        $("#gotoTop").fadeIn(100);
      }else{
        $("#gotoTop").fadeOut(200);
      };
    });
  },
  // 初始化
  init:function (obj) {
    $.ajax({
      type: 'GET',
      url: 'data/'+obj.jsonname+'.json',
      dataType: "json",
      success: function (data) {
        obj.goodsdata = data;

        this.gotoTop(obj);
        this.setnav(obj);
        this.setgoods(obj);
      }.bind(this)
    });
  },
}


