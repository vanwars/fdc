define(["underscore",
        "jquery",
        "backbone",
        "marionette",
        "views/base",
        "views/record-list",
        "views/record-detail",
        "views/mapbox",
        "collection",
        "model",
        "functions"
    ],
    function (_, $, Backbone, Marionette, BaseView, RecordListView, RecordDetailView, MapboxView, Collection, Model) {
        "use strict";
        var App = new Marionette.Application();
        _.extend(App, {
            datasets: {},
            pages: {},
            routes: {},
            appRouter: null,
            defaultRegion: '.section-content',

            buildViews: function (pages) {
                var that = this;
                /* Dynamically builds Backbone Views from the config file */
                _.each(pages, function (page) {
                    var View = that.getView(page),
                        v;
                    if (!page.url && page.url != "") {
                        v = new View(page);
                        $(page.region || that.defaultRegion).html(v.el);
                        v.delegateEvents();
                    }
                });
            },

            getView: function (page) {
                switch (page.type) {
                case "list":
                    this.attachDataset(page);
                    return RecordListView.extend(page);
                case "detail":
                    this.attachModelFromDataset(page);
                    return RecordDetailView.extend(page);
                case "mapbox":
                    this.attachDataset(page);
                    return MapboxView.extend(page);
                default:
                    return BaseView.extend(page);
                }
            },

            attachDataset: function (page) {
                if (!page.dataset) {
                    alert(page.type + " view must have dataset defined in the config file");
                    return;
                }
                var dataset = this.datasets[page.dataset];
                if (!dataset.collection) {
                    dataset.collection = new Collection({
                        api_endpoint: dataset.api_endpoint,
                        page_size: dataset.page_size || 10,
                        comparator: dataset.ordering_field || "id",
                        filter: dataset.filter
                    });
                }
                _.extend(page, dataset);
            },

            attachModelFromDataset: function (page) {
                if (!page.dataset) {
                    alert(page.type + " view must have dataset defined in the config file");
                    return;
                }
                var dataset = this.datasets[page.dataset];
                page.model = dataset.collection.get(page.modelID);
                if (!page.model) { page.model = new Model(); }
                page.model.urlRoot = dataset.api_endpoint;
            },

            buildRoutes: function (pages) {
                var that = this;
                /* Dynamically builds Backbone Routes from the config file */
                _.each(pages, function (page) {
                    page.vent = that.vent;
                    that.pages[page.url] = page;
                    if (page.type == "detail") {
                        page.modelID = page.id;
                    }
                    that.routes[page.url] = function (modelID) {
                        if (modelID) { page.modelID = modelID; }
                        if (page.template_path) {
                            that.loadView(page, modelID);
                        }
                        that.executeTransition(page);
                    };
                });
            },

            loadView: function (page, id) {
                if (id) { page.modelID = id; }
                var View = this.getView(page),
                    view = new View(page),
                    region = page.region.replace(":id", id);
                $(region || this.defaultRegion).html(view.el);
                view.delegateEvents();
            },

            applyRoutingHacks: function () {
                $('a').click(function () {
                    if ('#/' + Backbone.history.fragment == $(this).attr('href')) {
                        Backbone.history.loadUrl(Backbone.history.fragment);
                    }
                });
            },

            executeTransition: function (page) {
                if (page.transition) {
                    eval(page.transition + "(page)");
                }
            }
        });

        App.addInitializer(function (opts) {
            this.datasets = opts.datasets;
            this.buildViews(opts.pages);
            this.buildRoutes(opts.pages);
            var AppRouter = Backbone.Router.extend({
                routes: this.routes
            });
            this.appRouter = new AppRouter();
            Backbone.history.start();
            $(document).ready(function () {
                initialize();
            });
            this.applyRoutingHacks();
        });
        return App;
    });

