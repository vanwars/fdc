var datasets = {
    all: {
        api_endpoint: 'http://dev.localground.org/api/0/markers/',
        page_size: 50,
        filter: "WHERE project = 24"
    },
    oakland: {
        api_endpoint: 'http://dev.localground.org/api/0/markers/',
        page_size: 50,
        filter: "WHERE project = 24 and tags = 'oakland'"
    }
};
var pages = [
    {
        type: "mapbox",
        accessToken: "pk.eyJ1IjoibGF1cmVuYmVuaWNob3UiLCJhIjoiQ1BlZGczRSJ9.EVMieITn7lHNi6Ato9wFwg",
        styleID: "laurenbenichou.54e91cf8",
        markerSymbol: "restaurant", /* https://www.mapbox.com/maki/ */
        dataset: "oakland",
        clickRoute: "places"
    },
    {
        url: "regions/:city",
        collection_template_path: "place-list.html",
        item_template_path: "place-item.html",
        region: '#infoBoxGrid',
        type: "list",
        dataset: "oakland",
        filter: "WHERE project = 24 and tags = ':city'" /* Todo: move filters back to list + param substitution */
    },
    {
        url: "places/:id",
        template_path: "place-detail.html",
        region: '#infoBoxGrid',
        type: "detail",
        dataset: "all"
    }
];