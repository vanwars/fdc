window.location.hash = ''; //make sure the page initializes on the first page...

var addSearchEventHandler = function() {
    $(".search-button").click(function (e) {
        var text = $(this).prev().val();
        window.location.hash = "#/regions/" + text;
        $(".search-button").prev().val(text);
        e.preventDefault();
    });
};

var showSplash = function () {
    $(".splash").show();
    $("#topSearch, #infoBoxGrid").hide();
};

var hideSplash = function () {
    $(".splash").hide();
    $("#topSearch, #infoBoxGrid").show();
};

var initCarousel = function () {
	$('#myCarousel').carousel({
        interval: 3000
	});
    $('#myCarousel .item').first().addClass('active');
	$('.carousel-linked-nav > li > a').click(function () {
		var item = Number($(this).attr('href').substring(1));
		$('#myCarousel').carousel(item - 1);
		$('.carousel-linked-nav .active').removeClass('active');
		$(this).parent().addClass('active');
		return false;
	});

	$('#myCarousel').bind('slid', function () {
	    $('.carousel-linked-nav .active').removeClass('active');
	    var idx = $('#myCarousel .item.active').index();
	    $('.carousel-linked-nav li:eq(' + idx + ')').addClass('active');
	});
};

