define(["marionette",
        "handlebars",
        "views/mapbox",
        "views/store-detail",
        "text!/templates/map-page.html"],
    function (Marionette, Handlebars, MapboxView, StoreDetail, MapPageTemplate) {
        'use strict';
        var MapLayout = Marionette.LayoutView.extend({
            regions: {
                mapboxRegion: ".map",
                leftPanelRegion: "#left-panel"
            },
            initialize: function (opts) {
                _.extend(this, opts);
                this.opts = opts;
                Marionette.LayoutView.prototype.initialize.call(this);
                this.listenTo(this.app.vent, 'load-panel', this.loadStorePanel);
            },
            template: function () {
                return Handlebars.compile(MapPageTemplate);
            },
            onShow: function () {
                this.mapboxView = new MapboxView(this.opts);
                this.mapboxRegion.show(this.mapboxView);
            },
            loadStorePanel: function (id, isMobile) {
                var model = this.opts.collection.get(id);
                this.storeView = new StoreDetail({
                    model: model,
                    isMobile: isMobile
                });
                this.leftPanelRegion.show(this.storeView);
                if (isMobile) {
                    this.mapboxRegion.$el.hide();
                } else {
                    this.mapboxRegion.$el.show();
                }
            }
        });
        return MapLayout;
    });