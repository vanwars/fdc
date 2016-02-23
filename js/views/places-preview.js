define(["marionette",
        "underscore",
        "handlebars",
        "text!../../templates/thumb.html",
        "text!../../templates/thumb-list.html"],
    function (Marionette, _, Handlebars, ThumbTemplate, ListTemplate) {
        'use strict';
        var ThumbView = Marionette.CompositeView.extend({

            childView: Marionette.ItemView.extend({
                template: Handlebars.compile(ThumbTemplate),
                tagName: "div",
                className: "inner-grid"
            }),

            childViewContainer: ".outer-grid",
            selectedIndices: [],
            initialize: function (opts) {
                _.extend(this, opts);
                this.listenTo(this.collection, 'reset', this.onBeforeRender);
                Marionette.CompositeView.prototype.initialize.call(this);
            },

            template: function () {
                return Handlebars.compile(ListTemplate);
            },

            getRandomFromBucket: function (buckets) {
                var randomIndex = Math.floor(Math.random() * buckets.length);
                return buckets.splice(randomIndex, 1)[0];
            },
            pickN: function (n) {
                this.selectedIndices = [];
                var buckets = [], i = 0;
                for (i = 0; i < this.collection.length; i++) {
                    buckets.push(i);
                }
                for (i = 0; i < n; i++) {
                    this.selectedIndices.push(this.getRandomFromBucket(buckets));
                }
            },

            onBeforeRender: function () {
                this.pickN(4);
            },

            filter: function (child, index, collection) {
                // only render 5 random stores...
                if (this.selectedIndices.indexOf(index) > -1) {
                    return true;
                }
                return false;
            }

        });
        return ThumbView;
    });