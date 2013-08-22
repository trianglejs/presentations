(function(factory){
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'backbone', 'handlebars', 'backbone-localStorage'], factory);
    } else {
        factory(_, Backbone, Handlebars);
    }
})(function (_, Backbone, Handlebars){
    var config = {
        url     : '/templates/',       // template path
        ext     : '.hbs',              // template file extension
        version : '0.0.1',             // version number
        cache   : true,                // turn local storage caching on/off
        storage : new Backbone.LocalStorage('Templar') // default local storage plugin
    };

    Backbone.Templar = function( templatePaths, options ) {
        // if no options are passed
        var options           = ( typeof options === 'undefined' ) ? {} : options,
            templateExtension = ( options.ext ) ? options.ext : config.ext,
            baseUrlPath       = ( options.url ) ? options.url : config.url,
            version           = ( options.version ) ? options.version : config.version,
            cache             = ( typeof options.cache !== 'undefined' ) ? options.cache : config.cache,
            storage           = ( options.storage ) ? options.storage : config.storage;

        // -- public methods
        this.render = function( options ) {
            // set up defaults
            if ( !options.path ) throw new Error('A template path is required.');
            options.el = ( options.el ) ? options.el : document.body;
            TemplarCollection._render( options );
        }

        this.compile = function( options ) {
            // set up defaults
            if ( !options.path ) throw new Error('A template path is required.');
            return TemplarCollection._compile( options );
        }

        this.add = function() {
            // set up defaults
            if ( !options.path ) throw new Error('A template path is required.');
            TemplarCollection._add( options );
        }

        var TemplarCollection = new(Backbone.Collection.extend({

            initialize : function() {
                this._loadTemplates();
            },

            templates : templatePaths,

            model : Backbone.Model.extend({
                // Note: template file extension is an attribute set in config defaulting to .hbs
                defaults : function() {
                    return {
                        path    : null,
                        content : null,     // the stringified content of the template
                        version : version
                    };
                },

                url : function() {
                    var path = ( ( this.get('path') && ( this.get('path') !== 'undefined' ) )
                             ? this.get('path')
                             : '' );

                    return baseUrlPath + path + templateExtension;
                },

                parse : function(response) {
                    return {
                        content : response
                    };
                }
            }),

            localStorage : storage,

            // -- private methods
            _loadTemplates : function() {
                var self = this;
                var templates = this.localStorage.findAll();

                // check for version change
                if ( templates.length > 0 && templates[0].version !== version ) {
                    cache = false; // destroy cached versions and reload new version of templates
                }

                if ( cache ) {
                    for (var i = 0; i < templates.length; i++) {
                        this.add(templates[i]);
                    }
                } else {
                    // if our cache setting is turned off, never remember our templates
                    // basically a dev mode flag for debugging templates
                    _.each(templates, function(model) {
                        self.localStorage.destroy(model);
                    });
                }

                if ( this.templates ) {
                    for (var i = 0; i < this.templates.length; i++) {
                        this._add({
                            path : this.templates[i]
                        });
                    }
                }
            },

            _createModel : function(pathString) {
                var templateModel = new this.model({
                    path : pathString
                });

                return templateModel;
            },

            _add : function(options, cb) {
                var templateCheck = this.where({ path : options.path });

                //if there is already an existing stored template
                if( templateCheck.length == 0 ) {
                    // grab the template from the file system
                    templateModel = this._createModel(options.path);

                    $.ajax({
                        url      : baseUrlPath + options.path + templateExtension,
                        async    : false,
                        success  : function(response) {
                            templateModel.set({
                                'content' : response,
                                'path'    : options.path
                            });
                        }
                    });

                    // store template model in localStorage
                    this.add( templateModel );
                    this.create( templateModel.toJSON() );

                    if( typeof cb === 'function' ) {
                        cb();
                    }
                }
            },

            _compile : function(content, data) {
                data = ( data ) ? data : {};

                var compile = Handlebars.compile(content);
                return compile(data);
            },

            _render : function( options ) {
                var self = this;
                var compiledTemplate;
                var templateCheck = this.where({
                                        'path'    : options.path,
                                        'version' : version
                                    });
                
                //if there is already an existing stored template
                if( templateCheck.length > 0 ) {
                    compiledTemplate = this._compile(templateCheck[0].get('content'), options.data);

                } else {
                    this._add(options, _.bind(function() {
                        compiledTemplate = self._compile( templateModel.get('content'), options.data)
                    }, this));
                }
                
                // now inject the template into the DOM
                if ( options.append ) {
                    options.el.append(compiledTemplate);
                } else {
                    options.el.html(compiledTemplate);
                }
                // run a callback if provided through options.cb
                if( typeof options.cb === 'function' ) {
                    options.cb();
                }

             }
        }));
    }

    return Backbone.Templar;
});

