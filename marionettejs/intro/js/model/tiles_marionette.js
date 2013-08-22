define(
[
    'backbone'
],
function(
    Backbone
){

    /**
     * HelloWorld
     *
     * Generic model for the HelloWorld View.
     **/

    var TilesMarionetteModel = Backbone.Model.extend({
        url : '', // SET ME: default API route for model population
        defaults : {
            'id'       : null,
            'greeting' : 'Boom!',
            'message'  : 'Your <i>/tilesmarionette</i> Backbone route has been set up!'
        }
    });

    return TilesMarionetteModel;
});

