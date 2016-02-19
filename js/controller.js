define([
    "marionette"
], function (Marionette) {
    "use strict";
    return Marionette.Controller.extend({
        initialize: function (options) {
            this.app = options.app;
        },
        storeDetail: function (id) {
            console.log("regular");
            this.app.vent.trigger("load-panel", id, false);
        },
        storeDetailMobile: function (id) {
            console.log("mobile");
            this.app.vent.trigger("load-panel", id, true);
        },
        home: function () {
            console.log("home");
            this.app.mainRegion.$el.show();
        },
        explore: function () {
            console.log("explore");
            this.app.vent.trigger("full-screen");
            this.app.mainRegion.$el.hide();
            this.app.mapRegion.$el.show();
        }
    });
});