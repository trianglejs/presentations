require.config({
    paths : {
        'backbone'              : '/wilde/vendor/backbone/js/backbone.min',
        'backbone-mediator'     : '/wilde/vendor/backbone/plugins/backbone-mediator/js/backbone-mediator',
        'backbone-localStorage' : '/wilde/vendor/backbone/plugins/backbone-localStorage/js/backbone-localStorage',
        'bootstrap'             : '/wilde/vendor/bootstrap/js/bootstrap-2.3.2.min',
        'handlebars'            : '/wilde/vendor/handlebars/js/handlebars.min',
        'jquery'                : '/wilde/vendor/jquery/js/jquery.min',
        'marionette'            : '/wilde/vendor/marionette/js/marionette-1.1.0',
        'underscore'            : '/wilde/vendor/underscore/js/underscore.min'
    },
    shim : {
        'backbone' : {
            deps    : ['jquery', 'underscore'],
            exports : 'Backbone'
        },
        'backbone-mediator' : {
            deps    : ['underscore', 'backbone']
        },
        'backbone-localStorage' : {
            deps    : ['backbone'],
            exports : 'Backbone.LocalStorage'
        },
        'bootstrap' : {
            deps : ['jquery']
        },
        'handlebars' : {
            exports : 'Handlebars'
        },
        'jquery' : {
            exports : 'jQuery'
        },
        'marionette' : {
            deps : ['jquery', 'underscore', 'backbone'],
            exports : 'Marionette'
        },
        'underscore' : {
            exports : '_'
        }
    }
});

define([
    'app'
], function (
    App
){
    App.start({
        'version' : '0.0.1',
        'debug'   : true,
        'template' : {
            'path'  : '/wilde/views/tiles_marionette/templates/',
            'cache' : false
        },
        'module' : {
            'path' : '/wilde/views/tiles_marionette/js/module/'
        }
    });
});