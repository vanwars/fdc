location.hash = ''; //make sure the page initializes on the first page...

var showSplash = function () {
    $("#splash").fadeIn("slow");
    $("#topSearch, #left-panel, #search-button-top").fadeOut("slow");
    $("body").css({ overflow: 'auto'});
};

var hideSplash = function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#topSearch, #left-panel, #search-button-top").fadeIn("slow");
    $("#splash").fadeOut("slow");
    $("body").css({ overflow: 'hidden'});
};

