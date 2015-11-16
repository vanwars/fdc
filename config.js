var datasets = {
    fdc_data: {
        api_endpoint: 'http://dev.localground.org/api/0/markers/',
        page_size: 50,
        server_query: "WHERE project = 24"
    }
};
var pages = [
    {
        type: "mapbox",
        accessToken: "pk.eyJ1IjoibGF1cmVuYmVuaWNob3UiLCJhIjoiQ1BlZGczRSJ9.EVMieITn7lHNi6Ato9wFwg",
        styleID: "laurenbenichou.54e91cf8",
        markerSymbol: "restaurant", /* https://www.mapbox.com/maki/ */
        dataset: "fdc_data",
        clickRoute: "places"
    },
    {
        type: "list",
        url: "regions/:city",
        collection_template_path: "place-list.html",
        item_template_path: "place-item.html",
        region: '#infoBoxGrid',
        dataset: "fdc_data",
        client_query: "WHERE tags contains :city"
    },
    {
        type: "detail",
        url: "places/:id",
        template_path: "place-detail.html",
        region: '#infoBoxGrid',
        dataset: "fdc_data",
        onLoad: function () {
            pages[0].view.centerMap();
        }
    }
];