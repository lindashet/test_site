//-------------------------- Library Initial ----------------------------//

// AOS Animation
AOS.init({
    easing: 'ease-out-cubic',
    duration: '500'
});

// particlesJS
particlesJS('particles_js', { 'particles': { 'number': { 'value': 20, 'density': { 'enable': true, 'value_area': 800 } }, 'color': { 'value': '#ffffff' }, 'shape': { 'type': 'circle', 'stroke': { 'width': 0, 'color': '#000000' }, 'polygon': { 'nb_sides': 5 } }, 'opacity': { 'value': 0.5, 'random': false, 'anim': { 'enable': false, 'speed': 1, 'opacity_min': 0.1, 'sync': false } }, 'size': { 'value': 5, 'random': true, 'anim': { 'enable': false, 'speed': 40, 'size_min': 0.1, 'sync': false } }, 'line_linked': { 'enable': true, 'distance': 150, 'color': '#ffffff', 'opacity': 0.4, 'width': 1 }, 'move': { 'enable': true, 'speed': 6, 'direction': 'none', 'random': false, 'straight': false, 'out_mode': 'out', 'bounce': false, 'attract': { 'enable': false, 'rotateX': 600, 'rotateY': 1200 } } }, 'interactivity': { 'detect_on': 'canvas', 'events': { 'onhover': { 'enable': true, 'mode': 'repulse' }, 'onclick': { 'enable': true, 'mode': 'push' }, 'resize': true }, 'modes': { 'grab': { 'distance': 400, 'line_linked': { 'opacity': 1 } }, 'bubble': { 'distance': 400, 'size': 40, 'duration': 2, 'opacity': 8, 'speed': 3 }, 'repulse': { 'distance': 200, 'duration': 0.4 }, 'push': { 'particles_nb': 4 }, 'remove': { 'particles_nb': 2 } } }, 'retina_detect': true });

// Lottie Animator
// var lottie = lottie.loadAnimation({
//     container: document.getElementById('lottieBg'), // the dom element that will contain the animation
//     renderer: 'svg',
//     loop: false,
//     autoplay: true,
//     path: 'https://m5nqui6lzlwoxjtsjwao2g-on.drv.tw/lottie/data.json' // the path to the animation json
// });

//-------------------------- Declare Variables ----------------------------//

//-------- 漢堡選單開關 ---------//

var isHamburgerMenuOpened = false;

//-------- current Page Index ---------//

var currentGalleryPage = 0;
var currentTeamPage = 0;

//----------- Response Data -----------//

//作品 Data
var galleryData;
var galleryCount = 0;

//團隊成員 Data
var teamData;
var memberCount = 0;

// 更多文章 Data
var articleData;
var articleCount = 0;
// 產品 Data
var productData;
var productCount = 0;

// 服務 Data
var serviceData;
var serviceCount = 0;

// 資訊 Data
var infoData;

// 合作廠商 Data
var collabotateData;
var collaborateCount;

//----------- HTML Template -----------//

// 作品 galleryData item template
var gallery_item_html = "<a href='{{pageTag}}' data-aos={{aos}} id ='{{id}}' class='link col-md-4 col-sm-6'><div class='img_wrap'><img src={{imgUrl}}  alt='{{name}}-{{content}}'><div class='text_content'><h4>{{name}}</h4><p>{{content}}</p></div><div class='cover'/></div></div></a>";
var gallery_block_html = "<div data-aos={{aos}} id ={{id}} class='col-md-4 col-sm-6 empty'></div>";

// 團隊成員 teamData item template
var team_item_html = "<div data-aos={{aos}} id ={{id}} class='col-sm-4'><div class='team-member'><img class='mx-auto rounded-circle' src='{{imgUrl}}'><h4>{{name}}</h4><p class='text-muted'>{{job}}</p></div></div>";
var team_block_html = "<div data-aos={{aos}} id ={{id}} class='col-md-4 col-sm-6 empty'></div>";

// 更多文章 articleData item template
var article_item_html = "<div data-aos={{aos}} id ={{id}}><div class='img_wrap'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXb8AbVy5p1XxX8wQ_LSmvkKVS4faXlafh0HoiQzmp7ZulwhOw'></div><h5>{{name}}</h5><p>{{content}}</p></div>";

// 產品 productData item template
var product_item_html = "<div data-aos={{aos}} id ={{id}}><div class='wrap features'><img src={{imgUrl}} alt='{{name}} {{subtitle}}'><h4>{{name}}</h4><p>{{subtitle}}</p><div class='product_detail'><div class='product_detail_title'>{{name}} {{subtitle}}</div><span class='product_detail_content'>{{content}}</span></div></div></div></div>";

// 合作廠商 collabotateData item template
var collabotate_item_html = "<a href='{{official_website}}' target='_blank'><div id='{{id}}' class='brand_logo'><div id='{{img_id}}' class='brand_img'><img src='{{logo}}' alt='合作廠商-{{name}}'></div></div></a>";

//---------------------------- Screen Media Query ----------------------------//

var smScreen = window.matchMedia('(max-width: 992px)');
var lgScreen = window.matchMedia('(min-width: 992px)');
var mdMinScreen = window.matchMedia('(max-width: 767px)');
var mdMaxScreen = window.matchMedia('(min-width: 768px)');

//-------------------------------- AJAX ---------------------------------//

//Domain
var indexDomain = "";
var serverDomain = 'https://icarry-webserver.intelligentcarry.com/api/v1/';
var imageDomain = 'https://icarry-webserver.intelligentcarry.com/';

var productsUrl = 'products';
var servicesUrl = 'services';
var collectionsUrl = 'collections';
var infoUrl = 'company_informations';
var subscriptionpUrl = 'subscriptions';
var memberUrl = 'members';
var contactsUrl = 'contacts';
var collaborateUrl = 'business_partners';

//單一作品CSS
var cssFilePath = "";

//-------------- Request --------------//

//產品 Api
$.ajax({
    type: 'GET',
    url: serverDomain + productsUrl,
    success: function(res) {
        productData = res;
        productCount = productData.products.length;
        showProductList('fade-bottom');
        setTagLinkVisibility(productCount, '#products_tag');
        setSectionVisibility(productCount, '#section_products');
    }
});

//服務 Api
$.ajax({
    type: 'GET',
    url: serverDomain + servicesUrl,
    success: function(res) {
        serviceData = res;
        serviceCount = serviceData.services.length;
        showServiceList('fade-bottom');
        setTagLinkVisibility(serviceCount, '#services_tag');
        setSectionVisibility(serviceCount, '#section_services');
    }
});

//作品 Api
$.ajax({
    type: 'GET',
    url: serverDomain + collectionsUrl,
    success: function(res) {
        galleryData = res;
        galleryCount = galleryData.collections.length;
        smScreenUpdateView(smScreen);
        lgScreenUpdateView(lgScreen);
        setTagLinkVisibility(galleryCount, '#collections_tag');
        setSectionVisibility(galleryCount, '#section_collections');
    }
});

//作品詳細 Api
function getCollectionDetail(id) {
    $.ajax({
        type: 'GET',
        url: serverDomain + collectionsUrl + "/" + id,
        success: function(res) {
            if (res.css_file_url != null) {
                let cssTemplate = "<link id='collection-style' rel='stylesheet' href={{cssFilePath}} type='text/css' media='screen'>";
                cssFilePath = res.css_file_url;
                let cssStyleLink = cssTemplate.replace('{{cssFilePath}}', cssFilePath);
                $('head').append(cssStyleLink);
                $('#dialog .container').html(res.description);
            }
        }
    });
}

//合作廠商 Api
$.ajax({
    type: 'GET',
    url: serverDomain + collaborateUrl,
    success: function(res) {
        collabotateData = res;
        collaborateCount = collabotateData.business_partners.length;
        showCollaborateList();
    }
});

//團隊 Api
$.ajax({
    type: 'GET',
    url: serverDomain + memberUrl,
    success: function(res) {
        teamData = res;
        memberCount = teamData.members.length;
        mdMinScreenUpdateView(mdMinScreen);
        mdMaxScreenUpdateView(mdMaxScreen);
        setTagLinkVisibility(memberCount, '#team_tag');
        setSectionVisibility(memberCount, '#section_team');
    }
});

//更多文章 Api
setTagLinkVisibility(articleCount, '#article_tag');
setSectionVisibility(articleCount, '#section_article');

//資訊 Api
$.ajax({
    type: 'GET',
    url: serverDomain + infoUrl,
    success: function(res) {
        infoData = res;
        showInfo('fade-bottom');
    }
});

//按下訂閱 Api
function callSubscribtionApi(data) {
    $.ajax({
        url: serverDomain + subscriptionpUrl,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            alert('訂閱成功！');
        },
        error: function() {
            alert('訂閱失敗！');
        }
    })
}

//按下洽詢按鈕 Api
function callContactApi(data) {
    $.ajax({
        url: serverDomain + contactsUrl,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            alert('發送成功！');
        },
        error: function() {
            alert('發送失敗！');
        }
    })
}

// ----------------------------- Function callers -----------------------------//

$('#section_collections .arrow.left').addClass('hide');
$('#section_team .arrow.left').addClass('hide');

checkDialogOpening();

// --------------------------------- Functions --------------------------------//

//--------- Check Device Can Touch --------//

$("html").on('touchstart', function() {
    $("html").addClass('can_touch');
    $("html").off('touchstart');
});

//--------- Screen Media Query --------//

function smScreenUpdateView(smScreen) {
    if (smScreen.matches) {
        initGalleryList();
        if (galleryData.collections.length <= 6) {
            $('.more_btn').addClass('hide');
        } else {
            $('.more_btn').removeClass('hide');
        }
    }
}

function lgScreenUpdateView(lgScreen) {
    if (lgScreen.matches) {
        initGalleryList();
        $('#section_collections .arrow.left').addClass('hide');
        if (galleryData.collections.length <= 6) {
            $('#section_collections .arrow.right').addClass('hide');
        } else {
            $('#section_collections .arrow.right').removeClass('hide');
        }
    }
}

function mdMinScreenUpdateView(mdMinScreen) {
    if (mdMinScreen.matches) {
        initTeamList();
        $('#section_team .arrow.left').addClass('hide');
        if (memberCount > 3) {
            $('#section_team .arrow.right').removeClass('hide');
        } else {
            $('#section_team .arrow.right').addClass('hide');
        }
        $('.navbar-nav').addClass('hidden');
        $('#hamburger_btn').removeClass('hidden');
        isHamburgerMenuOpened = false;
    }
}

function mdMaxScreenUpdateView(mdMaxScreen) {
    if (mdMaxScreen.matches) {
        initTeamList();
        $('#section_team .arrow.left').addClass('hide');
        if (memberCount > 3) {
            $('#section_team .arrow.right').removeClass('hide');
        } else {
            $('#section_team .arrow.right').addClass('hide');
        }
        $('.navbar-nav').removeClass('hidden');
        $('#hamburger_btn').addClass('hidden');
        $('.hamburger_middle').removeClass('hamburger_middle_open');
        $('.hamburger_top').removeClass('hamburger_top_open');
        $('.hamburger_bottom').removeClass('hamburger_bottom_open');
        $('#hamburger_btn').removeClass('hamburger_btn_open');
        isHamburgerMenuOpened = true;
    }
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
        $('#dialog').removeClass('hide');
        $('.dailog_bg').removeClass('hide');
        $('body').css('overflow-y', 'hidden');
        getCollectionDetail(collectionID);
    }
}

//作品 init
function initGalleryList() {
    currentGalleryPage = 0;
    $('#gallery_html').html('');
    showGalleryList(currentGalleryPage, 'fade-bottom');
}

//團隊 init
function initTeamList() {
    currentTeamPage = 0;
    $('#team_html').html('');
    showTeamMemberList(currentTeamPage, 'fade-bottom');
}

//-------------- Show Data ------------//

//作品 顯示Data
function showGalleryList(page, aosType) {
    var initItemCount = page * 6;
    var currentPageItemsAmount = 6;

    if (galleryCount - initItemCount < 6) {
        currentPageItemsAmount = galleryCount - initItemCount;
    }

    for (var i = initItemCount; i < initItemCount + currentPageItemsAmount; i++) {

        var item = galleryData.collections[i];
        var item_id = 'gallery_item_' + galleryData.collections[i].id;
        if (i < initItemCount + currentPageItemsAmount) {
            var allItems = gallery_item_html
                .replace('{{aos}}', aosType)
                .replace('{{pageTag}}', indexDomain + '#' + item_id)
                .replace('{{id}}', item_id)
                .replace('{{imgUrl}}', imageDomain + item.image)
                .replace(/{{name}}/g, item.title)
                .replace(/{{content}}/g, item.subtitle);
            $('#gallery_html').append(allItems);

            //動態插入的元素綁定需用.on()
            $('#gallery_html').on('click', 'a#' + item_id, function(event) {
                let hashTag = $(this).attr('id');
                let collectionId = hashTag.replace("gallery_item_", "");
                $('#dialog .topic h1').text(hashTag);
                $('#dialog').removeClass('hide');
                $('.dailog_bg').removeClass('hide');
                $('body').css('overflow-y', 'hidden');

                //初始作品 Dialog
                getCollectionDetail(collectionId);
            });
        } else {
            var empBlock = gallery_block_html
                .replace('{{aos}}', aosType)
                .replace('{{id}}', '#' + item_id);

            $('#gallery_html').append(empBlock);

            if (smScreen.matches) {
                $('.empty').addClass('hide');
            } else if (lgScreen.matches) {
                $('.empty').addClass('transparent');
            }
        }
    }
}

//Team 顯示Data
function showTeamMemberList(page, aosType) {
    var initItemCount = page * 3;
    var currentPageItemsAmount = 3;

    if (memberCount - initItemCount < 3) {
        currentPageItemsAmount = memberCount - initItemCount;
    }

    if (mdMaxScreen.matches) {
        for (var i = initItemCount; i < initItemCount + currentPageItemsAmount; i++) {

            var item = teamData.members[i];
            var item_id = 'team_item_' + i;
            var photo;
            if (item.photo == null) {
                photo = './img/member/default.jpg';
            } else {
                photo = imageDomain + item.photo;
            }

            if (mdMaxScreen.matches) {
                if (i < initItemCount + currentPageItemsAmount) {
                    var allItems = team_item_html
                        .replace('{{aos}}', aosType)
                        .replace('{{id}}', '#' + item_id)
                        .replace('{{imgUrl}}', photo)
                        .replace('{{name}}', item.name)
                        .replace('{{job}}', item.jobtitle);
                    $('#team_html').append(allItems);
                }
            } else {
                var empBlock = team_block_html
                    .replace('{{aos}}', aosType)
                    .replace('{{id}}', '#' + item_id);

                $('#team_html').append(empBlock);

                $('.empty').addClass('transparent');
            }


        }
    } else if (mdMinScreen.matches) {

        for (var i = initItemCount; i < memberCount; i++) {

            var item = teamData.members[i];
            var item_id = 'team_item_' + i;
            var photo;
            if (item.photo == null) {
                photo = './img/member/default.jpg';
            } else {
                photo = imageDomain + item.photo;
            }

            var allItems = team_item_html
                .replace('{{aos}}', aosType)
                .replace('{{id}}', '#' + item_id)
                .replace('{{imgUrl}}', photo)
                .replace('{{name}}', item.name)
                .replace('{{job}}', item.jobtitle);
            $('#team_html').append(allItems);
        }
    }
}

//Article 顯示Data
function showArticleList(aosType) {
    for (var i = 0; i < articleData.count; i++) {

        var item = articleData.items[i];
        var item_id = 'article_item_' + i;
        var allItems = article_item_html
            .replace('{{aos}}', aosType)
            .replace('{{count}}', item.length)
            .replace('{{id}}', item_id)
            .replace('{{imgUrl}}', item.imgUrl)
            .replace('{{name}}', item.name)
            .replace('{{content}}', item.content);
        $('#article_html').append(allItems);

        if (articleData.count % 3 == 0) {
            if (i == articleData.count - 1) {
                $('#' + item_id).addClass('col-md-4');
                $('#' + item_id).addClass('col-sm-12');
            } else {
                $('#' + item_id).addClass('col-md-4');
                $('#' + item_id).addClass('col-sm-6');
            }
        } else if (articleData.count % 2 == 0) {
            $('#' + item_id).addClass('col-md-6');
            $('#' + item_id).addClass('col-sm-12');
        } else if (articleData.count % 1 == 0) {
            $('#' + item_id).addClass('col-sm-12');
        }
    }
}

//Product 顯示Data
function showProductList(aosType) {
    for (var i = 0; i < productCount; i++) {
        var item = productData.products[i];
        var item_id = item.id
        var allItems = product_item_html
            .replace('{{aos}}', aosType)
            .replace('{{id}}', 'product_item_' + item_id)
            .replace('{{imgUrl}}', imageUrl + item.image)
            .replace('{{name}}', item.title)
            .replace('{{subtitle}}', item.subtitle)
            .replace('{{content}}', item.content);

        $('#product_html').append(allItems);

        setRWDGridArrange(productCount, i, item_id);
    }
}

//Service 顯示Data
function showServiceList(aosType) {
    for (var i = 0; i < serviceCount; i++) {
        var item = serviceData.services[i];
        var item_id = 'service_item_' + i;
        var allItems = product_item_html
            .replace('{{aos}}', aosType)
            .replace('{{id}}', item_id)
            .replace('{{imgUrl}}', imageDomain + item.image)
            .replace(/{{name}}/g, item.title)
            .replace(/{{subtitle}}/g, item.subtitle)
            .replace('{{content}}', item.content);

        $('#service_html').append(allItems);

        setRWDGridArrange(serviceCount, i, item_id);
    }
}

//Collaborate Company 顯示Data
function showCollaborateList(aosType) {
    for (var i = 0; i < collaborateCount; i++) {
        var item = collabotateData.business_partners[i];
        var item_id = 'collaborate_company_' + i;
        var img_id = 'collaborate_company_' + item.name;
        var allItems = collabotate_item_html
            .replace('{{aos}}', aosType)
            .replace('{{id}}', item_id)
            .replace('{{img_id}}', img_id)
            .replace('{{logo}}', imageDomain + item.logo)
            .replace(/{{name}}/g, item.name)
            .replace('{{official_website}}', item.official_website);

        $('#brand_html').append(allItems);

        var touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
        if (!touchsupport) { // browser doesn't support touch
            $("head").append("<style>" + "#" + img_id + ":after{    background-image: url(" + imageDomain + item.logo_hover + ");}</style>");
            $("head").append("<style>" + "#" + item_id + ":hover{    background: " + item.hover_color + ";}</style>");
        }
    }
}

//Info 顯示Data
function showInfo(aosType) {
    var info = infoData;
    $('.about_info .tel').text(info.telephone);
    $('.about_info .email').text(info.email);
    $('.about_info .company_name').text(info.name);
    $('.about_info .company_en_name').text(info.english_name);
    $('.about_info .company_address').text(info.address);
}

//-------------- Set View -------------//

//判斷 Tag 是否顯示
function setTagLinkVisibility(count, tagId) {
    if (count == 0) {
        $(tagId).addClass('hide');
        $(tagId).addClass('hide');
    } else {
        $(tagId).removeClass('hide');
    }
}

//判斷 section 是否顯示
function setSectionVisibility(count, sectionId) {
    if (count == 0) {
        $(sectionId).addClass('hide');
        $(sectionId).addClass('hide');
    } else {
        $(sectionId).removeClass('hide');
    }
}

//產品 & 服務 Grid
function setRWDGridArrange(count, num, item_id) {
    //判斷大螢幕
    if (count % 3 == 0) {
        $('#' + item_id).addClass('col-lg-4');
    }

    if (count % 3 == 1) {
        if (num == 0) {
            $('#' + item_id).addClass('col-lg-12');
        } else {
            $('#' + item_id).addClass('col-lg-4');
        }
    }

    if (count % 3 == 2) {
        if (num == 0 || num == 1) {
            $('#' + item_id).addClass('col-lg-6');
        } else {
            $('#' + item_id).addClass('col-lg-4');
        }
    }
    //判斷中螢幕
    if (count % 2 == 0) {
        $('#' + item_id).addClass('col-md-6');
    }

    if (count % 2 == 1) {
        if (num == 0) {
            $('#' + item_id).addClass('col-md-12');
        } else {
            $('#' + item_id).addClass('col-md-6');
        }
    }
    //判斷小螢幕
    if (count % 1 == 0) {
        $('#' + item_id).addClass('col-sm-12');
    }
}

//關閉作品時清除 Dialog
function clearDialog() {
    $('#dialog').addClass('hide');
    $('.dailog_bg').addClass('hide');
    window.history.pushState({}, 0, indexDomain);
    $('body').css('overflow-y', 'scroll');
    $('head').find('link#collection-style').remove();
    $('#dialog .container').html("");
}
//------------------------------ Listener -------------------------------//

//----------- Scroll Listener ---------//

$(window).scroll(function(evt) {
    if ($(window).scrollTop() > 0) {
        $('.back_to_top').removeClass('transparent');

        if ($(document).scrollTop() >= $(document).height() - $(window).height() - 550) {
            $('.about').addClass('footer-dark');
            $('.navbar').addClass('navbar-top');
            $('.icarry_title').removeClass('icarry_title_transfer');
            $('.hamburger').removeClass('hamburger_bg_purple');
        } else {
            $('.about').removeClass('footer-dark');
            $('.navbar').removeClass('navbar-top');
            $('.icarry_title').addClass('icarry_title_transfer');
            $('.hamburger').addClass('hamburger_bg_purple');
        }
    } else {
        $('.navbar').addClass('navbar-top');
        $('.back_to_top').addClass('transparent');
        $('.icarry_title').removeClass('icarry_title_transfer');
        $('.hamburger').removeClass('hamburger_bg_purple');
    }
});

//back to top Btn
$body = (window.opera) ? (document.compatMode == 'CSS1Compat' ? $('html') : $('body')) : $('html,body'); // 这行是 Opera 的补丁, 少了它 Opera 是直接用跳的而且画面闪烁 by willin

$('.back_to_top').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});

//----------- Screen Listener ---------//

smScreen.addListener(smScreenUpdateView);
lgScreen.addListener(lgScreenUpdateView);
mdMinScreen.addListener(mdMinScreenUpdateView);
mdMaxScreen.addListener(mdMaxScreenUpdateView);

//----------- Click Listener ----------//

//作品 Left arrow
$('#section_collections .arrow.left').click(
    function() {
        if (currentGalleryPage > 0) {
            $('#gallery_html').html('');
            currentGalleryPage = currentGalleryPage - 1;
            showGalleryList(currentGalleryPage, 'fade-right');
            if (galleryData.count - currentGalleryPage * 6 < 6) {
                $('#section_collections .arrow.right').addClass('hide');
            } else {
                $('#section_collections .arrow.right').removeClass('hide');
            }

            if (currentGalleryPage == 0) {
                $('#section_collections .arrow.left').addClass('hide');
            } else {
                $('#section_collections .arrow.left').removeClass('hide');
            }
        }
    }
);

//作品 Right arrow
$('#section_collections .arrow.right').click(
    function() {
        if (galleryCount / 6 > currentGalleryPage + 1) {
            $('#gallery_html').html('');
            currentGalleryPage = currentGalleryPage + 1;
            showGalleryList(currentGalleryPage, 'fade-left');
            if (galleryCount - currentGalleryPage * 6 < 6) {
                $('#section_collections .arrow.right').addClass('hide');
            } else {
                $('#section_collections .arrow.right').removeClass('hide');
            }

            if (currentGalleryPage == 0) {
                $('#section_collections .arrow.left').addClass('hide');
            } else {
                $('#section_collections .arrow.left').removeClass('hide');
            }
        }
    }
);

//作品 更多btn
$('.more_btn').click(
    function() {
        if (galleryCount / 6 > currentGalleryPage + 1) {
            currentGalleryPage = currentGalleryPage + 1;
            showGalleryList(currentGalleryPage, 'fade-bottom');

            if (galleryCount - currentGalleryPage * 6 < 6) {
                $('.more_btn').addClass('hide');
            } else {
                $('.more_btn').removeClass('hide');
            }
        }
    }
);

//團隊 Left arrow
$('#section_team .arrow.left').click(
    function() {
        if (currentTeamPage > 0) {
            $('#team_html').html('');
            currentTeamPage = currentTeamPage - 1;
            showTeamMemberList(currentTeamPage, 'fade-right');
            if (memberCount - currentTeamPage * 3 < 3) {
                $('#section_team .arrow.right').addClass('hide');
            } else {
                $('#section_team .arrow.right').removeClass('hide');
            }

            if (currentTeamPage == 0) {
                $('#section_team .arrow.left').addClass('hide');
            } else {
                $('#section_team .arrow.left').removeClass('hide');
            }
        }
    }
);

//團隊 Right arrow
$('#section_team .arrow.right').click(
    function() {
        if (memberCount / 3 > currentTeamPage + 1) {
            $('#team_html').html('');
            currentTeamPage = currentTeamPage + 1;
            showTeamMemberList(currentTeamPage, 'fade-left');
            if (memberCount - currentTeamPage * 3 < 3) {
                $('#section_team .arrow.right').addClass('hide');
            } else {
                $('#section_team .arrow.right').removeClass('hide');
            }

            if (currentTeamPage == 0) {
                $('#section_team .arrow.left').addClass('hide');
            } else {
                $('#section_team .arrow.left').removeClass('hide');
            }
        }
    }
);

//訂閱 Btn
$('#follow_btn').click(
    function() {
        var subEmail = $('#sub_email').val();
        if (subEmail.length > 0) {
            var regex = '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$';
            if (subEmail.match(regex) == null) {
                alert('請填寫正確Email格式');
            } else {
                var subscribtionRequestData = {
                    email: subEmail
                };
                callSubscribtionApi(subscribtionRequestData);
            }
        } else {
            alert('請填寫Email');
        }
    }
);

//發送訊息 Btn
$('#contact_send_btn').click(
    function() {
        var contactRequestData = {
            name: $('#contact_name').val(),
            telephone: $('#contact_phone').val(),
            email: $('#contact_email').val(),
            content: $('#contact_content').val(),
        }

        if (contactRequestData.name.length == 0 ||
            contactRequestData.telephone.length == 0 || contactRequestData.email.length == 0 ||
            contactRequestData.content.length == 0) {

            alert('請填寫您的聯絡資訊與訊息內容');
        } else {
            // email regex
            var regex = '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$';
            if (contactRequestData.email.match(regex) == null) {
                alert('請填寫正確Email格式');
                return;
            }

            // phone regex
            regex = '^(09)\\d{8}$';
            if (contactRequestData.telephone.match(regex) == null) {
                alert('請填寫正確手機號碼格式');
                return;
            }
            callContactApi(contactRequestData);
        }
    }
);

//漢堡選單 Btn
$('#hamburger_btn').click(
    function() {
        if (isHamburgerMenuOpened) {
            $('.hamburger_middle').removeClass('hamburger_middle_open');
            $('.hamburger_top').removeClass('hamburger_top_open');
            $('.hamburger_bottom').removeClass('hamburger_bottom_open');
            $('#hamburger_btn').removeClass('hamburger_btn_open');
            $('.navbar-nav').addClass('hidden');
        } else {
            $('.hamburger_middle').addClass('hamburger_middle_open');
            $('.hamburger_top').addClass('hamburger_top_open');
            $('.hamburger_bottom').addClass('hamburger_bottom_open');
            $('#hamburger_btn').addClass('hamburger_btn_open');
            $('.navbar-nav').removeClass('hidden');
        }

        isHamburgerMenuOpened = !isHamburgerMenuOpened;
    }
);

//Menu跳頁 Btn
$('.navbar-right a').click(
    function() {

        if (mdMinScreen.matches) {
            $('.hamburger_middle').removeClass('hamburger_middle_open');
            $('.hamburger_top').removeClass('hamburger_top_open');
            $('.hamburger_bottom').removeClass('hamburger_bottom_open');
            $('#hamburger_btn').removeClass('hamburger_btn_open');
            $('.navbar-nav').addClass('hidden');
            isHamburgerMenuOpened = false;
        }
    }
);

//Dialog Close Btn
$('.close').click(
    function() {
        clearDialog();
    }
);

$('.dailog_bg').click(
    function() {
        clearDialog();
    }
);
