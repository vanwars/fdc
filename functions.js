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
    $(".splash").show();
    $("#topSearch, #infoBoxGrid").hide();
};

var hideSplash = function () {
    /*
     * Hides the splash page; users can see the main app
     */
    $(".splash").hide();
    $("#topSearch, #infoBoxGrid").show();
};

