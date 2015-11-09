define(["underscore", "marionette", "views/view-mixin"],
    function (_, Marionette, ViewMixin) {
        "use strict";
        var RecordView = Marionette.ItemView.extend({
            model: null,
            modelEvents: {
                'change': 'render'
            },
            initialize: function (opts) {
                console.log("initialize-detail");
                var that = this;
                this.$el.empty();
                _.extend(this, opts);
                this.model.fetch({
                    success: function () {
                        _.extend(that.extras, that.model.toJSON());
                        that.render();
                    }
                });
                //this.render();
            }
        });
        _.extend(RecordView.prototype, ViewMixin);
        return RecordView;
    });