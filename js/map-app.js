define([
    "marionette",
    "backbone",
    "router",
    "collection",
    "views/thumb-view",
    "views/map-view"
], function (Marionette, Backbone, Router, Collection, ThumbView, MapView) {
    "use strict";
    var MapApp = Marionette.Application.extend({
        regions: {
            mapRegion: ".map-page",
            mainRegion: ".splash-page"
        },
        start: function (options) {
            // Perform the default 'start' functionality
            Marionette.Application.prototype.start.apply(this, [options]);
            this.router = new Router({ app: this});
            Backbone.history.start();
        },
        initialize: function (options) {
            Marionette.Application.prototype.initialize.apply(this, [options]);

            //fetch data:
            this.collection = new Collection(null, {
                api_endpoint: 'https://dev.localground.org/api/0/photos/',
                page_size: 150,
                server_query: "WHERE project = 33"
            });
            this.collection.fetch({ reset: true });

            //initialize views:
            this.mainView = new ThumbView({
                app: this,
                collection: this.collection
            });
            this.mapView = new MapView({
                collection: this.collection,
                app: this,
                accessToken: "pk.eyJ1IjoibGF1cmVuYmVuaWNob3UiLCJhIjoiQ1BlZGczRSJ9.EVMieITn7lHNi6Ato9wFwg",
                styleID: "laurenbenichou.54e91cf8",
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
            });

            //load views into regions:
            this.mainRegion.show(this.mainView);
            this.mapRegion.show(this.mapView);
        }
    });
    return MapApp;
});