var datasets = {
    fdc_data: {
        api_endpoint: 'http://dev.localground.org/api/0/markers/',
        page_size: 50,
        server_query: "WHERE project = 24"
    }
};

var pages = {
    splash: {
        url: "",
        template_path: "splash.html",
        region: '#splash',
        postRender: addSearchEventHandler,
        transition: showSplash
    },
    map_box: {
        type: "mapbox",
        accessToken: "pk.eyJ1IjoibGF1cmVuYmVuaWNob3UiLCJhIjoiQ1BlZGczRSJ9.EVMieITn7lHNi6Ato9wFwg",
        styleID: "laurenbenichou.54e91cf8",
        markerSymbol: "restaurant", /* Look here for more icons: https://www.mapbox.com/maki/ */
        dataset: "fdc_data",
        clickRoute: "places",
        postRender: function () {
            pages.map_box.view.map.fitBounds(pages.map_box.view.layer.getBounds());
        }
    },
    navbar: {
        //urls: ["regions/", "regions/:city"],
        template_path: "search-form.html",
        region: '#topSearch'
    },
    foodList: {
        type: "list",
        urls: ["regions/", "regions/all"],
        collection_template_path: "place-list.html",
        item_template_path: "place-item.html",
        region: '#infoBoxGrid',
        dataset: "fdc_data",
        transition: hideSplash
    },

    cityFoodList: {
        type: "list",
        url: "regions/:city",
        collection_template_path: "place-list.html",
        item_template_path: "place-item.html",
        region: '#infoBoxGrid',
        dataset: "fdc_data",
        client_query: "WHERE tags contains :city",
        transition: hideSplash
    },

    foodDetailPage: {
        type: "detail",
        url: "places/:id",
        template_path: "place-detail.html",
        region: '#infoBoxGrid',
        dataset: "fdc_data",
        transition: hideSplash,
        postRender: initCarousel
    }
};