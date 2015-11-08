define(["underscore", "marionette", "views/view-mixin"],
    function (_, Marionette, ViewMixin) {
        "use strict";
        var RecordView = Marionette.ItemView.extend({
            model: null,
            modelEvents: {
                'change': 'render'
            },
            initialize: function (opts) {
                var that = this;
                _.extend(this, opts);
                this.model.fetch({
                    success: function () {
                        _.extend(that.extras, that.model.toJSON());
                        that.render();
                    }
                });
                this.render();
            }
        });
        _.extend(RecordView.prototype, ViewMixin);
        return RecordView;
    });