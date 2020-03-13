// AOS Animation
AOS.init({
  easing: "ease-out-cubic",
  duration: "500"
});
//-------------------------- Declare Variables ----------------------------//

//-------- 漢堡選單開關 ---------//

var isHamburgerMenuOpened = false;

//----------- Response Data -----------//

// 更多文章 Data
var articleData;
var articleCount = 0;

// 資訊 Data
var infoData;

//---------------------------- Screen Media Query ----------------------------//

var smScreen = window.matchMedia("(max-width: 992px)");
var lgScreen = window.matchMedia("(min-width: 992px)");
var mdMinScreen = window.matchMedia("(max-width: 767px)");
var mdMaxScreen = window.matchMedia("(min-width: 768px)");

// --------------------------------- Functions --------------------------------//

//-------------------------------- AJAX ---------------------------------//

//Domain
var indexDomain = "";
var serverDomain = "https://icarry-webserver.intelligentcarry.com/api/v1/";
var imageDomain = "https://icarry-webserver.intelligentcarry.com/";

var infoUrl = "company_informations";
var subscriptionpUrl = "subscriptions";
var contactsUrl = "contacts";
var articlesUrl = "articles";

//-------------- Request --------------//

//文章 Api
$.ajax({
  type: "GET",
  url: serverDomain + articlesUrl,
  success: function(res) {
    articleData = res;
    showArticleList();
  }
});

//資訊 Api
$.ajax({
  type: "GET",
  url: serverDomain + infoUrl,
  success: function(res) {
    infoData = res;
    showInfo();
  }
});

//按下訂閱 Api
function callSubscribtionApi(data) {
  $.ajax({
    url: serverDomain + subscriptionpUrl,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      alert("訂閱成功！");
    },
    error: function() {
      alert("訂閱失敗！");
    }
  });
}

//按下洽詢按鈕 Api
function callContactApi(data) {
  $.ajax({
    url: serverDomain + contactsUrl,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      $("#contact_phone").val("");
      $("#contact_email").val("");
      $("#contact_content").val("");
      alert("發送成功！");
    },
    error: function() {
      alert("發送失敗！");
    }
  });
}

//-------------- init Data ------------//
//進入首頁判斷是否開啟 Dialog
function checkDialogOpening() {
  //記下頁面網址
  indexDomain = window.location.pathname;
  //判斷頁面是否有hash tag
  let galleryStr = location.hash.indexOf("#gallery_item");
  if (location.hash.length != 0 && galleryStr == 0) {
    let collectionID = location.hash.replace("#gallery_item_", "");
    $("#dialog").removeClass("hide");
    $(".dailog_bg").removeClass("hide");
    $("body").css("overflow-y", "hidden");
    getCollectionDetail(collectionID);
  }
}

//-------------- Show Data ------------//

//Article 顯示Data
function showArticleList() {
  let articles = articleData.articles;
  $(".article_item.third").css("display", "none");
  $(".article_img.third").css("display", "none");
  $(".article_item.second").css("display", "none");
  $(".article_img.second").css("display", "none");
  $(".article_item.first").css("display", "none");
  $(".article_img.first").css("display", "none");
  switch (articles.length) {
    case 3:
      $(".article_img.third").css(
        "background-image",
        "url(" + imageDomain + articles[2].image + ")"
      );
      $(".article_item.third h5").text(articles[2].title);
      $(".article_item.third p").text(articles[2].subtitle);
      $(".article_item.third").css("display", "block");
      $(".article_img.third").css("display", "block");
    case 2:
      $(".article_img.second").css(
        "background-image",
        "url(" + imageDomain + articles[1].image + ")"
      );
      $(".article_item.second h5").text(articles[1].title);
      $(".article_item.second p").text(articles[1].subtitle);
      $(".article_item.second").css("display", "block");
      $(".article_img.second").css("display", "block");
    case 1:
      $(".article_img.first").css(
        "background-image",
        "url(" + imageDomain + articles[0].image + ")"
      );
      $(".article_item.first h5").text(articles[0].title);
      $(".article_item.first p").text(articles[0].subtitle);
      $(".article_item.first").css("display", "block");
      $(".article_img.first").css("display", "block");
      break;
    default:
      break;
  }
}

//Info 顯示Data
function showInfo() {
  var info = infoData;
  $(".company_info .tel").text(info.telephone);
  $(".company_info .email").text(info.email);
  $(".company_info .company_name").text(info.name);
  $(".company_info .company_en_name").text(info.english_name);
  $(".company_info .company_address").text(info.address);
}

//--------- Check Device Can Touch --------//

$("html").on("touchstart", function() {
  $("html").addClass("can_touch");
  $("html").off("touchstart");
});

//--------- Screen Media Query --------//

function smScreenUpdateView(smScreen) {
  if (smScreen.matches) {
  }
}

function lgScreenUpdateView(lgScreen) {
  if (lgScreen.matches) {
  }
}

function mdMinScreenUpdateView(mdMinScreen) {
  if (mdMinScreen.matches) {
    $(".navbar-nav").addClass("hidden");
    $("#hamburger_btn").removeClass("hamburger_btn_open");
    isHamburgerMenuOpened = false;
  }
}

function mdMaxScreenUpdateView(mdMaxScreen) {
  if (mdMaxScreen.matches) {
    $(".hamburger_middle").removeClass("hamburger_middle_open");
    $(".hamburger_top").removeClass("hamburger_top_open");
    $(".hamburger_bottom").removeClass("hamburger_bottom_open");
    $("#hamburger_btn").removeClass("hamburger_btn_open");
    $(".nav_menu").css("display", "none");
    $("nav").removeClass("nav_toggle");

    isHamburgerMenuOpened = true;
  }
}

var page = 0;
let totalPage = 5;

var galleryThumbs = new Swiper(".gallery-thumbs", {
  spaceBetween: 0,
  slidesPerView: 4,
  loop: true,
  freeMode: true,
  loopedSlides: 10, //looped slides should be the same
  watchSlidesVisibility: true,
  watchSlidesProgress: true
});

var galleryTop = new Swiper(".gallery-top", {
  spaceBetween: 0,
  loop: true,
  loopedSlides: 10, //looped slides should be the same
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  thumbs: {
    swiper: galleryThumbs
  }
});

var isInit = true;
var galleryBottom = new Swiper(".gallery-bottom", {
  pagination: {
    el: ".swiper-pagination"
  },
  spaceBetween: 0,
  loop: true,
  loopedSlides: 10, //looped slides should be the same
  on: {
    slideChangeTransitionEnd: function() {
      if (!isInit) {
        const index = this.activeIndex % totalPage;
        $(".flows").css("left", "-" + index * 100 + "%");
        page = index;
        setProjectNavbarSelectedStatus();
      } else {
        isInit = !isInit;
      }

      // alert(index); //切换结束时，告诉我现在是第几个slide
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});

$(document).on("aos:in:project_flow_animate", function(ev) {
  var element = ev.detail;
  setTimeout(function() {
    setProjectNavbarSelectedStatus();
  }, 800);
});

$(document).on("aos:in:main_head_text_animate_services", function(ev) {
  var element = ev.detail;
  $(".services .main_head_text").addClass("main_head_text_play");
});

$(document).on("aos:in:main_head_text_animate_project_flow", function(ev) {
  var element = ev.detail;
  $(".project_flow .main_head_text").addClass("main_head_text_play");
});

$(document).on("aos:in:main_head_text_animate_team", function(ev) {
  var element = ev.detail;
  $(".team .main_head_text").addClass("main_head_text_play");
});

$(".view_container").click(function() {
  page += 1;

  if (page > totalPage - 1) {
    page = 0;
  }
  $(".flows").css("left", "-" + page * 100 + "%");
  setProjectNavbarSelectedStatus();
});

for (var i = 0; i < totalPage; i++) {
  let tabName = ".tab_" + (i + 1);
  setClickListener(tabName, i);
}

function setClickListener(tabName, pageIndex) {
  $(tabName).click(function() {
    $(".flows").css("left", "-" + pageIndex * 100 + "%");
    page = pageIndex;
    setProjectNavbarSelectedStatus();
    galleryBottom.slideTo(page, 700, true);
  });
}

function removeCssClass(tabName, className) {
  $(tabName).removeClass(className);
}

function setProjectNavbarSelectedStatus() {
  for (let i = 0; i < totalPage; i++) {
    if (i == page) {
      removeCssClass(".tab_" + (i + 1), "transition_tab");
      removeCssClass(".tab_line_" + (i + 1), "transition_tab_line");
      $(".tab_" + (i + 1)).addClass("selected_tab");
      $(".tab_line_" + (i + 1)).addClass("selected_tab_line");
      $(".tab_arrow_" + (i + 1)).css("background-color", "#9664E2");
    } else if (i < page) {
      removeCssClass(".tab_" + (i + 1), "selected_tab");
      removeCssClass(".tab_line_" + (i + 1), "selected_tab_line");
      $(".tab_" + (i + 1)).addClass("transition_tab");
      $(".tab_line_" + (i + 1)).addClass("transition_tab_line");
      $(".tab_arrow_" + (i + 1)).css("background-color", "transparent");
    } else {
      removeCssClass(".tab_" + (i + 1), "selected_tab");
      removeCssClass(".tab_" + (i + 1), "transition_tab");
      removeCssClass(".tab_line_" + (i + 1), "selected_tab_line");
      removeCssClass(".tab_line_" + (i + 1), "transition_tab_line");
      $(".tab_arrow_" + (i + 1)).css("background-color", "transparent");
    }
  }
}

//------------------------------ Listener -------------------------------//

//----------- Scroll Listener ---------//

$(window).scroll(function(evt) {
  if ($(window).scrollTop() > 0) {
    $(".back_to_top").removeClass("transparent");
    $(".about").removeClass("footer-dark");
    $(".navbar").removeClass("navbar-top");
    $(".icarry_title").addClass("icarry_title_transfer");
    $("nav").addClass("nav_bg_color");
    $(".logo").addClass("logo_bg_color");
    $(".logo").removeClass("logo_bg_white");
  } else {
    $(".navbar").addClass("navbar-top");
    $(".back_to_top").addClass("transparent");
    $(".icarry_title").removeClass("icarry_title_transfer");
    $("nav").removeClass("nav_bg_color");
    $(".logo").removeClass("logo_bg_color");
    $(".logo").addClass("logo_bg_white");
  }
});

// $(".services_btn").click(function() {
//   $("html, body").animate(
//     {
//       scrollTop: 500
//     },
//     "slow"
//   );
// });

//back to top Btn
$body = window.opera
  ? document.compatMode == "CSS1Compat"
    ? $("html")
    : $("body")
  : $("html,body"); // 这行是 Opera 的补丁, 少了它 Opera 是直接用跳的而且画面闪烁 by willin

function closeNavMenu() {
  $(".hamburger_middle").removeClass("hamburger_middle_open");
  $(".hamburger_top").removeClass("hamburger_top_open");
  $(".hamburger_bottom").removeClass("hamburger_bottom_open");
  $("#hamburger_btn").removeClass("hamburger_btn_open");
  $(".nav_menu").css("display", "none");
  $("nav").removeClass("nav_toggle");
}

$(".logo").click(function() {
  $("html, body").animate(
    {
      scrollTop: 0
    },
    1000
  );
});

$(".services_btn").click(function() {
  closeNavMenu();
  isHamburgerMenuOpened = false;

  $("html, body").animate(
    {
      scrollTop: $(".services").offset().top
    },
    1000
  );
});

$(".categories_btn").click(function() {
  closeNavMenu();
  isHamburgerMenuOpened = false;

  $("html, body").animate(
    {
      scrollTop: $(".categories").offset().top
    },
    1000
  );
});

$(".project_flow_btn").click(function() {
  closeNavMenu();
  isHamburgerMenuOpened = false;

  $("html, body").animate(
    {
      scrollTop: $(".project_flow").offset().top
    },
    1000
  );
});

$(".team_btn").click(function() {
  closeNavMenu();
  isHamburgerMenuOpened = false;

  $("html, body").animate(
    {
      scrollTop: $(".team").offset().top
    },
    1000
  );
});

$(".article_btn").click(function() {
  closeNavMenu();
  isHamburgerMenuOpened = false;

  $("html, body").animate(
    {
      scrollTop: $(".article").offset().top
    },
    1000
  );
});

$(".contact_btn").click(function() {
  closeNavMenu();
  isHamburgerMenuOpened = false;

  $("html, body").animate(
    {
      scrollTop: $(".contact").offset().top
    },
    1000
  );
});
//----------- Screen Listener ---------//

smScreen.addListener(smScreenUpdateView);
lgScreen.addListener(lgScreenUpdateView);
mdMinScreen.addListener(mdMinScreenUpdateView);
mdMaxScreen.addListener(mdMaxScreenUpdateView);

//----------- Click Listener ----------//

//訂閱 Btn
$("#follow_btn").click(function() {
  var subEmail = $("#sub_email").val();
  if (subEmail.length > 0) {
    var regex = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
    if (subEmail.match(regex) == null) {
      alert("請填寫正確Email格式");
    } else {
      var subscribtionRequestData = {
        email: subEmail
      };
      callSubscribtionApi(subscribtionRequestData);
    }
  } else {
    alert("請填寫Email");
  }
});

//發送訊息 Btn
$("#contact_send_btn").click(function() {
  var contactRequestData = {
    telephone: $("#contact_phone").val(),
    email: $("#contact_email").val(),
    content: $("#contact_content").val()
  };

  if (
    contactRequestData.telephone.length == 0 ||
    contactRequestData.email.length == 0 ||
    contactRequestData.content.length == 0
  ) {
    alert("請填寫您的聯絡資訊與訊息內容");
  } else {
    // email regex
    var regex = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
    if (contactRequestData.email.match(regex) == null) {
      alert("請填寫正確Email格式");
      return;
    }

    // phone regex
    regex = "^(09)\\d{8}$";
    if (contactRequestData.telephone.match(regex) == null) {
      alert("請填寫正確手機號碼格式");
      return;
    }
    callContactApi(contactRequestData);
  }
});

//漢堡選單 Btn

$("#hamburger_btn").click(function() {
  if (isHamburgerMenuOpened) {
    closeNavMenu();
  } else {
    $(".hamburger_middle").addClass("hamburger_middle_open");
    $(".hamburger_top").addClass("hamburger_top_open");
    $(".hamburger_bottom").addClass("hamburger_bottom_open");
    $("#hamburger_btn").addClass("hamburger_btn_open");
    $(".nav_menu").css("display", "block");
    $("nav").addClass("nav_toggle");
  }

  isHamburgerMenuOpened = !isHamburgerMenuOpened;
});

//Menu跳頁 Btn
// $('.navbar-right a').click(
//     function() {

//         if (mdMinScreen.matches) {
//             $('.hamburger_middle').removeClass('hamburger_middle_open');
//             $('.hamburger_top').removeClass('hamburger_top_open');
//             $('.hamburger_bottom').removeClass('hamburger_bottom_open');
//             $('#hamburger_btn').removeClass('hamburger_btn_open');
//             $('.navbar-nav').addClass('hidden');
//             isHamburgerMenuOpened = false;
//         }
//     }
// );
