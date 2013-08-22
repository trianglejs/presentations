define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'backbone-mediator'
], function(
    $,
    _,
    Backbone,
    Handlebars
){
    var BaseView = Backbone.View.extend({
        // just a reference for asset url config
        assetRoot : '/wilde/views/tiles_marionette/',
        /**
         * BaseView#addHelpers()
         **/
        addHelpers : function() {
            Handlebars.registerHelper('nl2br', function(text) {
                var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
                return new Handlebars.SafeString(nl2br);
            });
        },
        /**
         * BaseView#keyOrder(hash) -> Array
         * - hash : a hash of values
         *
         * Just getting a list of alphabetically sorted hash keys.
         **/
        keyOrder : function(hash) {
            var self = this,
                keys = [];

                keys = _.keys(hash);
                keys = _.sortBy(keys, function (key) {
                    return key.toLowerCase();
                });

            return keys;
        },
        /**
         * BaseView#destroySubscriptions()
         **/
        destroySubscriptions : function () {
            var self = this;

            for (sub in self.subscriptions) {
                Backbone.Mediator.unsubscribe(sub, self[self.subscriptions[sub]], self);
            }
        },
        /**
         * BaseView#destructor()
         **/
        destructor : function () {
            var self = this;
            self.remove();
            self.unbind();
            if (self.onDestruct) {
                self.onDestruct();
            }

            self.destroySubscriptions();
        }
    });

    return BaseView;
});

