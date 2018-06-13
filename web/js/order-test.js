var order = {
  length:$(".tab-item").length,
  width:window.screen.width<640?window.screen.width:640+"px",
  // 创建元素模板函数
  buildElement:function (tag,attrs,html) {
    var element = document.createElement(tag);
    // 判断第二个参数是属性还是内容
    if(typeof(attrs) == "string"){
      html = attrs;
      attrs = null;
    }
    // 判断是否有第二个属性参数
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
  clickfun:function () {
    $(".tab-header").on("click",".tab-elm",function (e) {
      var target = e.target;
      var n = $(target).index();
      //header 样式
      $(target).addClass("tab-elm-active").siblings("[class~='tab-elm-active']").removeClass("tab-elm-active");
      //页面移动
      $(".tab-content").css("left",-n*parseFloat(this.width)+"px");
      this.getlist(n);
      $(".tab-content")[0].scrollIntoView();
    }.bind(this));
  },
  move:function (length,width) {
    var n = 0;
    var moved = 0;
    var startX = 0;
    $(".tab-content").on("touchstart",".tab-item",function () {
      startX = event.changedTouches[0].clientX;
      moved = 0;
    });

    $(".tab-content").on("touchmove",".tab-item",function () {
      var moveX = event.changedTouches[0].clientX;
      moved = moveX - startX;
    });

    $(".tab-content").on("touchend",".tab-item",function (e) {
      var target =e.currentTarget;
      n = $(target).index();

      if(moved > 100){
        if(n>0){
          n--;
          this.getlist(n);
          $(".tab-content")[0].scrollIntoView();
        }
      }else if(moved < -100){
        //获取列表
        if(n < (this.length-1)){
          n++;
          this.getlist(n);
          $(".tab-content")[0].scrollIntoView();
        }
      }

      //header 样式
      $($(".tab-header .tab-elm")[n]).addClass("tab-elm-active").siblings("[class~='tab-elm-active']").removeClass("tab-elm-active");
      //页面移动
      $(".tab-content").css("left",-n*width);
    }.bind(this));
  },
  getlist : function(n) {
    $.ajax({
      type: 'GET',
      url: 'http://xiongkun.top/data/order-test.php',
      data:{state:n},
      dataType: "json",
      success: function (data) {
        if(data.length>0){
          // 把订单号相同的放一起
          for(var m = 0,arrbox=[];m<data.length;m++){
            var arr = [];
            for (var l = 0;l<data.length;l++){
              if(data[m].ordernum === data[l].ordernum){
                if(m<=l){
                  arr.push(data[l]);
                }else {
                  break;
                }
              }
            }
            if(arr.length>0){
              arrbox.push(arr);
            }
          };
          // 按订单号排序
          this.arrsort(arrbox);
          console.log(arrbox);
          $(".tab-item")[n].innerHTML = "";

          var documentfragment = document.createDocumentFragment();
          var orderitems = this.buildElement("ul",{"class":"cart-elms"});
          // 显示每个订单
          for(var i = 0;i<arrbox.length;i++){

            var orderitem = this.buildElement("li",{"class":"cart-elm cart-goods"});
            orderitems.appendChild(orderitem);

            var shop = this.buildElement(
              "div",
              {"class":"cart-elm-top"},
              "<i class=\"icon-shop vertical_center\"></i>\n" +
              "<div class=\"shop-name fl\">好万家自营</div>\n" +
              "<div class=\"shop-product-status fl\">"+$(".tab-elm")[arrbox[i][0].state].innerHTML+"</div>"
            );
            orderitem.appendChild(shop);

            var listbox = this.buildElement("div",{"class":"cart-elm-content"});
            orderitem.appendChild(listbox);

            var goodsul = this.buildElement("ul",{"class":"cart-products"});
            orderitem.appendChild(goodsul);

            // 显示每个订单中的每个商品
            for(var j = 0;j<arrbox[i].length;j++){

              var goodsli = this.buildElement(
                "li",
                {"class":"cart-product"},
                "<div class=\"cart-product-content\">\n" +
                " <div class=\"cart-product-detail\">\n" +
                "     <div class=\"cart-product-img vertical_center\">\n" +
                "         <img src="+arrbox[i][j].imgurl+" alt=\"\">\n" +
                "     </div>\n" +
                "     <div class=\"cart-product-text\">\n" +
                "         <p class=\"cart-product-name\">"+arrbox[i][j].name+"</p> <span class=\"fr\">×"+arrbox[i][j].count+"</span>\n" +
                "         <p class=\"cart-product-guige cart-guige\">规格: "+arrbox[i][j].guige+"</p>\n" +
                "         <p class=\"cart-product-price\">￥"+arrbox[i][j].price+"</p>\n" +
                "     </div>\n" +
                " </div>\n" +
                " </div>"
                );
              goodsul.appendChild(goodsli);
            };

            var itemfooter = this.buildElement(
              "div",
              {"class":"cart-product-footer"},
              "<div class=\"cart-product-footer-left\">共<span class=\"cart-product-footer-num\">"+arrbox[i].length+"</span>件商品</div>\n" +
              " <div class=\"cart-product-footer-right\">\n" +
              "     实付款：<span class=\"cart-product-footer-price\">￥25111.0</span>\n" +
              " </div>"
              );
            orderitem.appendChild(itemfooter);

            var itembtn = this.buildElement(
              "div",
              {"class":"cart-btn"},
              " <button class=\"right-btn\">支付</button>\n" +
              "<button class=\"left-btn\">取消</button>"
              );
            orderitem.appendChild(itembtn);
          }

          documentfragment.appendChild(orderitems);
          $(".tab-item")[n].appendChild(documentfragment);

          // 设置当前页面的高
          var h = getComputedStyle($(".tab-item")[n]).height;
          console.log(h);
          $(".tab-content").css("height",h);
        }else{
          console.log("null");
        }
      }.bind(this)
    });
  },
  arrsort:function (arr) {
    for (let i =0;i<arr.length;i++ ){
      for (let j = 0;j<arr.length-1;j++){
        if(arr[j][0].ordernum < arr[j+1][0].ordernum){
          var tem = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = tem;
        }
      }
    }
    return arr;
  },
  init:function () {
    $(".tab-content .tab-item").css("width",this.width);
    $(".tab-content").css("width",this.length*parseFloat(this.width)+"px");

    this.clickfun();
    this.move(this.length,this.width);
    this.getlist(0);
  }
};
window.onload = function () {
  order.init();
};
window.onresize = function () {
  order.init();
};