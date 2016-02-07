/*
 * The Five Dollar Challenge is powered by the Local Ground Web Development Kit,
 * which can be found here: https://github.com/vanwars/lg-web-toolkit. The
 * documentation is out of date, but in the meantime, see the README.md file in this
 * directory for guidance in configuring your app.
 */
var datasets = {
    fdc_data: {
        api_endpoint: 'https://dev.localground.org/api/0/photos/',
        page_size: 150,
        server_query: "WHERE project = 33"
    }
};

var pages = {
    splash: {
        url: "",
        template_path: "splash.html",
        region: ".bottom-two-thirds",
        className: "outer-grid",
        transition: showSplash
    },
    explore: {
        url: "explore",
        transition: showMap
    },
    map: {
        type: "mapbox",
        accessToken: "pk.eyJ1IjoibGF1cmVuYmVuaWNob3UiLCJhIjoiQ1BlZGczRSJ9.EVMieITn7lHNi6Ato9wFwg",
        styleID: "laurenbenichou.54e91cf8",
        dataset: "fdc_data",
        center: [39.889, -97.114],
        zoom: 4,
        disableZoomScroll: true,
        marker: {
            clickURL: "places/:id",
            color: "eb6627",
            icon: {
                iconUrl: 'assets/plate2.png',
                iconSize: [50, 50],
                iconAnchor: [25, 25]
            },
            zoomLevelDetail: 10
        }
    },
    foodDetailPage: {
        type: "detail",
        url: "places/:id",
        template_path: "place-detail.html",
        region: '#left-panel',
        dataset: "fdc_data",
        transition: showDetail
    }
};