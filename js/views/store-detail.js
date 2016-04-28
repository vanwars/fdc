define([
    "jquery",
    "underscore",
    "handlebars",
    "marionette",
    "text!../../templates/place-detail.html",
    "text!../../templates/place-detail-zoom.html",
    "hammerjs",
    "jquery-hammerjs"
], function ($, _, Handlebars, Marionette, StoreTemplate, StoreSheetTemplate, Hammer) {
    "use strict";
    var StoreDetail = Marionette.ItemView.extend({
        events: {
            'click .zoom': 'zoomToMarker',
            'click .more': 'showSheet',
            'click .previous-place': 'previous',
            'click .next-place': 'next',
            'click .previous-place-zoom': 'previous',
            'click .next-place-zoom': 'next'
        },
        template: Handlebars.compile(StoreTemplate),
        initialize: function (opts) {
            _.extend(this, opts);
            Marionette.ItemView.prototype.initialize.call(this);
            if (this.isFullScreen) {
                this.template = Handlebars.compile(StoreSheetTemplate);
            } else {
                this.template = Handlebars.compile(StoreTemplate);
            }
        },
        showSheet: function (e) {
            this.app.vent.trigger('load-panel', this.model.get("id"), true);
            if (e) { e.preventDefault(); }
        },
        hideSheet: function (e) {
            this.app.vent.trigger('load-panel', this.model.get("id"), false);
            if (e) { e.preventDefault(); }
        },
        onRender: function () {
            this.addSwipeHandlers();
        },
        checkIfIsFullScreen: function () {
            return this.$el.find(".mobile-sheet").length > 0;
        },
        addSwipeHandlers: function () {
            //http://stackoverflow.com/questions/30079136/how-to-get-hammer-js-to-work-with-backbone
            //https://github.com/wookiehangover/backbone.hammer/issues/2
            var that = this, div, hammerMain;
            div = this.$el.find('.food-detail').get(0);
            if (div) {
                hammerMain = new Hammer(div, {
                    touchAction: 'pan-x'
                });
                hammerMain.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
                hammerMain.on('swipeleft', function () {
                    that.next();
                });
                hammerMain.on('swiperight', function () {
                    that.previous();
                });
                hammerMain.on('swipeup', function () {
                    that.showSheet();
                });
                hammerMain.on('swipedown', function () {
                    that.hideSheet();
                });
            }
        },
        navigate: function (url, index) {
            var model = this.model.collection.at(index);
            this.app.router.navigate(url + model.get("id"), {trigger: true});
        },
        previous: function (e) {
            var url = this.isFullScreen ? "places/zoom/" : "places/",
                i = this.model.collection.indexOf(this.model);
            this.navigate(url, (i == 0) ? this.model.collection.length - 1 : i - 1);
            if (e) { e.preventDefault(); }
        },
        next: function (e) {
            var url = this.isFullScreen ? "places/zoom/" : "places/",
                i = this.model.collection.indexOf(this.model);
            this.navigate(url, (i == this.model.collection.length - 1) ? 0 : i + 1);
            if (e) { e.preventDefault(); }
        },
        onShow: function () {
            this.model.trigger("center-marker");
        },
        zoomToMarker: function (e) {
            var zoom = $(e.target).attr("zoom-level");
            if (!zoom) {
                alert("Please give your zoom a \"zoom-level\" attribute.");
            }
            this.model.trigger('zoom-to-marker', zoom);
            if (e) { e.preventDefault(); }
        }
    });
    return StoreDetail;
});