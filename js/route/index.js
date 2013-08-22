define([
    'marionette'
],
function(
    Marionette
){
    var IndexRouter = Backbone.Marionette.AppRouter.extend({
        initialize : function(options) {
            this.app = options.app;
        },
        // "someMethod" must exist at controller.someMethod
        appRoutes: {
            ''                 : 'tilesMarionette',
            'tilesmarionette'  : 'tilesMarionette'
        }
    });

    return IndexRouter;
});