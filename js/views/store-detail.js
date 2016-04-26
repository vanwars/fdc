define([
    "underscore",
    "handlebars",
    "marionette",
    "text!../../templates/place-detail.html",
    "text!../../templates/place-detail-zoom.html",
    "hammerjs",
    "jquery-hammerjs"
], function (_, Handlebars, Marionette, StoreDetailTemplate, StoreDetailMobileTemplate, Hammer) {
    "use strict";
    var StoreDetail = Marionette.ItemView.extend({
        events: {
            'click .zoom': 'zoomToMarker',
            'click .previous-place': 'previousPlace',
            'click .next-place': 'nextPlace',
            'click .previous-place-zoom': 'previousPlaceZoom',
            'click .next-place-zoom': 'nextPlaceZoom'
        },
        template: Handlebars.compile(StoreDetailTemplate),
        initialize: function (opts) {
            _.extend(this, opts);
            Marionette.ItemView.prototype.initialize.call(this);
            if (this.isMobile) {
                this.template = Handlebars.compile(StoreDetailMobileTemplate);
            } else {
                this.template = Handlebars.compile(StoreDetailTemplate);
            }
        },
        onRender: function () {
            this.addSwipeHandlers();
        },
        addSwipeHandlers: function () {
            //http://stackoverflow.com/questions/30079136/how-to-get-hammer-js-to-work-with-backbone
            //https://github.com/wookiehangover/backbone.hammer/issues/2
            var that = this, mainDiv, zoomDiv, hammerMain, hammerZoom;
            mainDiv = this.$el.find('.food-detail').get(0);
            zoomDiv = this.$el.find('.zoom-photo-container').get(0);

            if (mainDiv) {
                hammerMain = new Hammer(mainDiv),
                hammerMain.on('swipeleft', function (ev) {
                    that.nextPlace();
                });
                hammerMain.on('swiperight', function (ev) {
                    that.previousPlace();
                });
            }
            if (zoomDiv) {
                hammerZoom = new Hammer(zoomDiv);
                hammerZoom.on('swipeleft', function (ev) {
                    that.nextPlaceZoom();
                });
                hammerMain.on('swiperight', function (ev) {
                    that.previousPlaceZoom();
                });
            }
        },
        /*onRender: function () {
            //this.$el.hammer();
            new Hammer(this.el);
            console.log('onrender');
            //console.log(this.$el.find('.food-detail').html());
            //this.$el.find('.food-detail').trigger('swipeleft');
        },*/
        navigate: function (url, index) {
            var model = this.model.collection.at(index);
            this.app.router.navigate(url + model.get("id"), {trigger: true});
        },
        previous: function (url) {
            console.log('previous');
            var i = this.model.collection.indexOf(this.model);
            this.navigate(url, (i == 0) ? this.model.collection.length - 1 : i - 1);
        },
        next: function (url) {
            var i = this.model.collection.indexOf(this.model);
            this.navigate(url, (i == this.model.collection.length - 1) ? 0 : i + 1);
        },
        previousPlace: function (e) {
            this.previous("places/");
            if (e) { e.preventDefault(); }
        },
        previousPlaceSwipe: function (e) {
            console.log("swipeLeft", e);
            this.previous("places/");
            if (e) { e.preventDefault(); }
            //this.previousPlaceZoom(e);
        },
        previousPlaceZoom: function (e) {
            this.previous("places/zoom/");
            if (e) { e.preventDefault(); }
        },
        nextPlace: function (e) {
            this.next("places/");
            if (e) { e.preventDefault(); }
        },
        nextPlaceZoom: function (e) {
            this.next("places/zoom/");
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