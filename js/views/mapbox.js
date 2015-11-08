define(["jquery", "marionette", "mapbox-lib"],
    function ($, Marionette) {
        "use strict";
        var MapboxView = Marionette.CompositeView.extend({
            id: 'map',
            map: null,
            layer: null,
            initialize: function (opts) {
                //initialize the map:
                L.mapbox.accessToken = 'pk.eyJ1IjoibGF1cmVuYmVuaWNob3UiLCJhIjoiQ1BlZGczRSJ9.EVMieITn7lHNi6Ato9wFwg';
                this.map = L.mapbox.map('map', 'laurenbenichou.54e91cf8', {
                    zoomControl: true
                }).setView([37.812, -122.294], 15);
            }
        });
        return MapboxView;
    });