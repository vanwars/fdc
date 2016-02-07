location.hash = ''; //make sure the page initializes on the first page...

var showSplash = function () {
    $(".splash-page").fadeIn("slow");
    $(".map-page").fadeOut("slow");
    $("body").css({ overflow: 'auto'});
};

var showApp = function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#search-button-top").fadeIn("slow");
    $("body").css({ overflow: 'hidden'});
};

var showMap = function () {
    showApp();
    $(".splash-page, #left-panel").fadeOut("slow");
    $(".map-page").fadeIn("slow");
    pages.map.view.fitMapToLayer();
};

var showDetail = function () {
    showApp();
    $("#splash").fadeOut("slow");
    $("#left-panel").fadeIn("slow");
};



