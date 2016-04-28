define([
    "marionette"
], function (Marionette) {
    "use strict";
    return Marionette.Controller.extend({
        initialize: function (options) {
            this.app = options.app;
        },
        storeDetail: function (id) {
            //todo: move this to store detail:
            console.log('storeDetail');
            this.app.vent.trigger("load-panel", id, false);
            this.app.mainRegion.$el.hide();
            this.app.mapRegion.$el.show();
        },
        storeDetailMobile: function (id) {
            console.log('storeDetailMobile');
            this.app.vent.trigger("load-panel", id, true);
        },
        home: function () {
            this.app.mainRegion.$el.show();
        },
        explore: function () {
            this.app.vent.trigger("zoom-to-extents");
            this.app.mainRegion.$el.hide();
            this.app.mapRegion.$el.show();
        }
    });
});