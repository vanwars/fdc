define(["marionette",
        "underscore",
        "handlebars",
        "text!/templates/thumb.html",
        "text!/templates/thumb-list.html"],
    function (Marionette, _, Handlebars, ThumbTemplate, ListTemplate) {
        'use strict';
        var ThumbView = Marionette.CompositeView.extend({

            childView: Marionette.ItemView.extend({
                template: Handlebars.compile(ThumbTemplate),
                tagName: "div",
                className: "inner-grid"
            }),

            childViewContainer: ".outer-grid",

            initialize: function (opts) {
                _.extend(this, opts);
                this.listenTo(this.collection, 'reset', this.onRender);
                Marionette.CompositeView.prototype.initialize.call(this);
            },

            template: function () {
                return Handlebars.compile(ListTemplate);
            }

            /*for debugging purposes...
            attachHtml: function (collectionView, itemView, index) {
                console.log(collectionView, itemView, index);
            },

            render: function () {
                console.log("render");
                console.log(this.collection.length);
                return Marionette.CompositeView.prototype.render.call(this);
            },

            onRender: function () {
                console.log(this.collection);
                this.collection.each(function (model, index) {
                    console.log(index, model.get("path_medium"));
                });
            },*/

        });
        return ThumbView;
    });