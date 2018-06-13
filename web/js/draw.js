window.onload = function () {
  draw.init();
};
window.onresize = function () {
  draw.init();
};
var draw = {
  w : 0 ,
  h : 0,
  Lamp: 0,
  news : [],
  duration : 3600,//允许转盘旋转的总时长
  init : function () {
    this.setPin();
    this.btnArea();
    this.drawClick();
    this.drawNews();
  },
  //获取设置map的图片的宽和高
  imgSize : function (img) {
    this.w = parseFloat(getComputedStyle(img).width);
    this.h = parseFloat(getComputedStyle(img).height);
  },
  setMap : function (boxclass,imgclass,mapname,a,b,c,d,e,f) {
    $(boxclass).removeClass("hide");
    $(".icon-close").on("click",function () {
      $(boxclass).addClass("hide");
    });
    this.imgSize($(imgclass)[0]);
    var x1 = a/e*this.w,x2 = c/e*this.w;
    var y1 = b/f*this.h,y2 = d/f*this.h;
    $($("[name='"+mapname+"'] area")[0]).attr("coords",x1+","+y1+","+x2+","+y2);
  },
  //设置转盘指针的位置
  setPin : function () {
    var w = parseFloat(getComputedStyle($(".pin img")[0]).width);
    $(".pin").css("height",w);
  },
  //转盘首页两个按钮
  btnArea : function () {
    this.imgSize($(".draw-bg")[0]);
    var x1 = 28/750*this.w,x2 = 170/750*this.w,x3 = 576/750*this.w,x4 = 717/750*this.w;
    var y1 = 364/1227*this.h,y2 = 417/1227*this.h;
    $($("[name='btn'] area")[0]).attr("coords",x1+","+y1+","+x2+","+y2);
    $($("[name='btn'] area")[1]).attr("coords",x3+","+y1+","+x4+","+y2);
    $($("[name='btn'] area")[0]).on("click",this.ruleShow.bind(this));
    $($("[name='btn'] area")[1]).on("click",function () {
      window.location.href = "draw-data.html";
    });
  },
  //抽奖规则页按钮
  ruleShow : function () {
    this.setMap(".draw-rule",".rule-bg","btnRule",53,720,550,785,603,815);
    $($("[name='btnRule'] area")[0]).on("click",function () {
      $(".draw-rule").addClass('hide');
    });
  },
  //显示没有抽到奖
  drawNothing : function () {
    this.setMap(".draw-nothing",".draw-nothing-bg","btnDraw",54,641,550,706,604,762);
    $($("[name='btnDraw'] area")[0]).on("click",function () {
      $(".draw-nothing").addClass('hide');
    });
    this.drawClick();
  },
  //显示抽到的奖
  drawSomething : function () {
    this.setMap(".draw-something",".draw-something-bg","btnCheck",54,443,550,508,604,544);
    $($("[name='btnCheck'] area")[0]).on("click",function () {
      window.location.href = "draw-data.html";
    });
    this.drawClick();
  },
  //点击开始抽奖
  drawClick : function () {
    $(".pin").on("click",function(){
      this.panRoll(0);
    }.bind(this));
  },
  //转盘转动
  panRoll : function (degree) {

    $(".pin").off("click");

    var now = 0;//当前旋转的时间

    if(Math.random()<0.6){
      //再接再厉
      if(Math.random() < 0.2){
        this.duration = 3700;
      }else if (Math.random() < 0.4 && Math.random() >= 0.2){
        this.duration = 4050;
      }else if (Math.random() < 0.6 && Math.random() >= 0.4){
        this.duration = 4500;
      }
    }else if (Math.random() < 0.7 && Math.random() >= 0.6){
      //精美礼品
      this.duration = 3900;
    }else if (Math.random() < 0.8 && Math.random() >= 0.7) {
      //1000 积分
      this.duration = 4200;
    }else if (Math.random() < 0.9 && Math.random() >= 0.8) {
      //优惠券
      this.duration = 4650;
    }else if (Math.random() < 1 && Math.random() >= 0.8) {
      //25积分
      this.duration = 3600;
    };
    console.log(this.duration);
    var timer=setInterval(function(){
      this.panLamp();
      degree+=15;
      $(".draw-pan").css("transform","rotate("+degree+"deg)");
      now += 50;
      //判断是否可以停止旋转
      if( now >= this.duration){
        clearInterval(timer);
        degree=degree%360;
        if(degree>= 337.5 || degree < 22.5){
          degree = 360;
          this.drawSomething();
          $(".draw-something-text span").html("25积分");
        }else if(degree >= 22.5 && degree < 67.5){
          degree = 45;
          this.drawNothing();
        }else if(degree >= 67.5 && degree < 112.5){
          degree = 90;
          this.drawSomething();
          $(".draw-something-text span").html("精美礼品");
        }else if(degree >= 112.5 && degree < 157.5){
          degree = 135;
          this.drawNothing();
        }else if(degree >= 157.5 && degree < 202.5){
          degree = 180;
          this.drawSomething();
          $(".draw-something-text span").html("1000积分");
        }else if(degree >= 202.5 && degree < 247.5){
          degree = 270;
          this.drawNothing();
        }else if(degree >= 247.5 && degree < 292.5){
          degree = 270;
          this.drawNothing();
        }else if(degree >= 292.5 && degree < 337.5){
          degree = 315;
          this.drawSomething();
          $(".draw-something-text span").html("优惠券");
        }

        $(".draw-pan").css("transform","rotate("+degree+"deg)");
      }
    }.bind(this),50);
  },
  //转盘边缘闪灯效果
  panLamp : function () {
    if(this.Lamp === 0){
      $(".pan-lamp").attr("src","images/draw/red-pan-02.png");
      this.Lamp = 1;
    }else if(this.Lamp === 1){
      $(".pan-lamp").attr("src","images/draw/red-pan-01.png");
      this.Lamp = 0;
    }
  },
  //底部抽奖消息
  drawNews : function () {
    this.imgSize($(".draw-bg")[0]);
    $(".draw-news").css("height",this.h * (95/1334));

    this.news = [
      "limm1235 抽中 精美礼品 1分钟前",
      "xiaoxiong 抽中 25积分 2分钟前",
      "weidong 抽中 1000积分 3分钟前",
      "chiyuan 抽中 再接再厉 4分钟前",
      "hongteng 抽中 优惠券 5分钟前"
    ];

    this.newsRender();
    this.newsRoll();
  },
  newsRender : function () {
    var documentNews = document.createDocumentFragment();
    for (var i = 0;i< this.news.length;i++){
      var div = document.createElement("div");
      div.setAttribute("class","draw-news-item");
      div.innerHTML = this.news[i];
      $(div).css({
        "height":$(".draw-news").css("height"),
        "line-height":$(".draw-news").css("height")
      });
      documentNews.appendChild(div);
    }
    $(".draw-news-items").append(documentNews);
  },
  //抽奖信息滚动
  newsRoll : function () {
    var t = 0;
    var timer = setInterval(function () {
      t += 1;
      $(".draw-news-box").css("top", -t+"px");
      if (t >= parseFloat($(".draw-news").css("height"))){
        t = 0;
        $(".draw-news-box").css("top", 0);
        $(".draw-news-items").html("");
        this.news = this.news.slice(1).concat(this.news.slice(0,1));
        this.newsRender();
      }
    }.bind(this),80);
  }
};
