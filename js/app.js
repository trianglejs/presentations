define([
    'marionette',
    'backbone',
    'underscore',
    'route/index',
    'controller/index'
], function (
    Marionette,
    Backbone,
    _,
    IndexRouter,
    IndexController
){
    // set up the app instance
    var App = new Marionette.Application({

        onInitializeBefore : function(options) {
            this.config = options;

            if (this.config.debug) {
                console.info('App.onInitializeBefore()');

                // debugging event monitoring
                App.vent.on('all', function (e, model) {
                    console.log('App DEBUG: Event Caught: ' + e);
                    if (model) {
                        console.dir(model);
                    }
                });
            }

            /* --------------------------- */

            this.indexRouter = new IndexRouter({
                controller : new IndexController()
            });

            
        },

        onInitializeAfter : function(options) {
            if ( this.config.debug ) console.info('App.onInitializeAfter()');
            // ...
        },

        onStart : function(options) { if ( this.config.debug ) console.info('App.onStart()');
            if (Backbone.history){
                Backbone.history.start();
            }
        }
    });

    // configuration, setting up regions, etc ...

    // export the app from this module
    return App;
});