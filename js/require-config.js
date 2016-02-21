require.config({
    baseUrl: "js",
    paths: {
        'backbone': 'external/backbone-min',
        'handlebars': 'external/handlebars.min',
        'jquery': '//code.jquery.com/jquery-2.1.4',
        'jquery.bootstrap': '//netdna.bootstrapcdn.com/twitter-bootstrap/2.0.4/js/bootstrap.min',
        'text': 'external/text',
        'marionette': '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.4.4/backbone.marionette.min',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        'mapbox-lib': 'http://api.mapbox.com/mapbox.js/v2.2.3/mapbox'
    },
    shim: {
        'underscore': {
            exports: "_"
        },
        'mapbox-lib': {
            exports: 'L'
        },
        'backbone': {
            deps: [ "jquery", "underscore" ],
            exports: "Backbone"
        },
        'marionette': {
            deps: [ "backbone" ],
            exports: "Marionette"
        },
        'handlebars': {
            exports: "Handlebars"
        },
        'jquery.bootstrap': {
            deps: ['jquery']
        }
    },
    urlArgs: "bust=" + (new Date()).getTime()
});

require(
    ["jquery", "js/map-app.js"],
    function ($, MapApp) {
        'use strict';
        $(function () {
            window.location.hash = ''; //make sure the page initializes on the first page...
            var mapApp = new MapApp();
            mapApp.start();
        });
    }
);


