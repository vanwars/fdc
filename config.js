/*
 * The Five Dollar Challenge is powered by the Local Ground Web Development Kit,
 * which can be found here: https://github.com/vanwars/lg-web-toolkit. The
 * documentation is out of date, but will be updated soon. In the meantime,
 * some guidelines:
 *
 * I. Config File Overview
 * -----------------------
 * This config file requires that you define two JavaScript objects:
 *    (1) datasets: a dictionary of the various API endpoints (and parameters)
 *    from which the data will be sourced
 *    
 *    (2) pages: a dictionary of each "page" in the website. Pages are really
 *    just HTML and/or JavaScript snippets that get injected into the page when
 *    a user executes on a particular event (i.e., usually an HTML bookmark, via
 *    an anchor tag).
 *
 * II. Dictionary Entries
 * -----------------------
 *     (1) dataset entry (child of datasets)
 *     -------------------------------------
 *     Each dataset entry consists of a key -- an an arbitrary dataset name that you make up
 *     (e.g. "fdc_data") -- and three properties:
 *     
 *       (a) api_endpoint (string): a URL to the API endpoint to be used.
 *       (b) page_size (integer): The maximum number of entries you would like to return for each query.
 *       (c) server_query (string): The criteria by which you would like to filter your queries.
 *
 *     (2) page entry (child of pages)
 *     -------------------------------
 *     Each page entry consists of a key -- an arbitrary page name that you make up
 *     (e.g. "splash") -- and several properties:
 *
 *       (a) type (string, optional): specifies the type of page to load. Valid values are:
 *           - "mapbox": loads a mapbox map
 *           - "list": loads in a list of data from an API endpoint
 *           - "detail": loads a single data entry (from an API endpoint)
 *           - "basic": Just loads a plain HTML template
 *           Defaults to "basic" if no additional type is specified.
 *          
 *       (b) url (string, optional):
 *           specifies that the snippet will only load if
 *           the url specified is called. If no url is specified, the page loads right away
 *       (c) urls (list, optional):
 *           if you want the same page to load for multiple urls.
 *       (d) template_path (string, required for "basic" and "detail" types):
 *           specifies the location of the HTML template, which is located in the "templates"
 *           directory
 *       (e) region (css selector string, required for all types except for "mapbox"):
 *           specifies where, in the main page (index.html), the template should be injected into.
 *           For instance, for the "splash" page (below), the "splash.html" template will be injected
 *           into the "#splash" selector (container where id="splash") on the index.html page.
 *       (f) postRender (function, optional):
 *           function that gets called after the page loads. All functions must be
 *           defined in the functions.js file.
 *       (g) transition (function, optional):
 *           function that gets called while the new page is loading; often an animation.
 *
 *       There are also some additional configuration options that are type-specific:
 *       
 *       (a) type: "mapbox"
 *           i.   accessToken: Your mapbox access token.
 *           ii.  styleID: Your mapbox style ID
 *           iii. markerSymbol: TBD...still being extended to accommodate custom symbols
 *           iv.  dataset: the datasource for the markers.
 *           v.   clickRoute: when you click a marker, what url route to load.
 *
 *       (b) type: "list"
 *           i.   dataset: the datasource for the list of data.
 *           ii.  collection_template_path: the template that holds the entire list
 *                (see "place-list.html" for more details)
 *           iii. item_template_path: the template that holds each individual entry
 *                (see "place-item.html" for more details). Note the variable substitution
 *                notation, which corresponds to the dataset returned by the API endpoint
 *
 *       (c) type: "detail"
 *           i.   dataset: the datasource for the list of data.
 *           ii.  url: special convention: uses the :id parameter to specify which id,
 *                specifically, will be queried by the endpoint. See the "foodDetailPage"
 *                below
 */
var datasets = {
    fdc_data: {
        api_endpoint: 'https://dev.localground.org/api/0/markers/',
        page_size: 150,
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
    map: {
        type: "mapbox",
        accessToken: "pk.eyJ1IjoibGF1cmVuYmVuaWNob3UiLCJhIjoiQ1BlZGczRSJ9.EVMieITn7lHNi6Ato9wFwg",
        styleID: "laurenbenichou.54e91cf8",
        markerSymbol: "restaurant", /* Look here for more icons: https://www.mapbox.com/maki/ */
        dataset: "fdc_data",
        clickRoute: "places"
    },
    navbar: {
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
        transition: hideSplash
    }
};