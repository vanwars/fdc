location.hash = ''; //make sure the page initializes on the first page...

var addSearchEventHandler = function () {
    /*
     * Adds button even handler, which navigates to the
     * region of interest, based on the city
     * the user wants to search for (from the textbox)
     */
    $(".search-button").click(function (e) {
        var $input = $(this).prev(),
            text = $input.val();
        window.location.hash = "#/regions/" + text;
        $(".search-button").prev().val(text);
        e.preventDefault();
    });
};

var showSplash = function () {
    /*
     * Shows the splash page; everything else is greyed out.
     */
    $("#splash").fadeIn("slow");
    $("#topSearch, #left-panel, #search-button-top").fadeOut("slow");
    $("body").css({ overflow: 'auto'});
};

var hideSplash = function () {
    /*
     * Hides the splash page; users can see the main app
     */
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#topSearch, #left-panel, #search-button-top").fadeIn("slow");
    $("#splash").fadeOut("slow");
    $("body").css({ overflow: 'hidden'});
};

