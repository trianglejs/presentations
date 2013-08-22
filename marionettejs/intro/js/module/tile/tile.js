define([ 
  'marionette',
  'module/tile/tile.view',
  'util/templar'
  
], function( 
	Marionette,
	TileView,
	Templar
){	

	var TileModule = function(Tile) {
		_.extend(Tile, {
			debug           : false,
			modulePath      : './',
			startWithParent : false,
			onStart : function(options) { if ( this.debug ) console.info('TileModule.onStart()');
				_.bindAll(this);

				this.debug      = ( options && options.debug ) ? options.debug : this.debug;
				this.modulePath = ( options && options.modulePath ) ? options.modulePath : this.modulePath;

				// using a front end handlebars template manager
	            // which can handle caching in production and template
	            // invalidation through versioning
	            this.templar = ( !self.templar )
	                         ? new Templar([
	                               'tile'
	                           ], {
	                               url     : this.modulePath + 'tile/',
	                               version : '0.0.1',
	                               cache   : !this.debug
	                           })
	                         : self.templar;

				this.tileView = new TileView({
					'templar' : this.templar,
					'debug'   : this.debug
				});
			},

			show : function() {
				this.tileView.render();

				if (this.debug) {
					console.log(this.tileView.ui.saveBtn);
					console.log(this.tileView.ui.nameField);
				}
			},

			onStop : function() { 
				if ( this.debug ) { console.info('TileModule.onStop()'); }

				this.tileView.close();
			}
		});
	}

	return TileModule;

	//console.log(App);

	// var App = require(['app'], function (App) {

	// 	var TileModule = App.module("Tile", function(Tile, App, Backbone, Marionette, $, _, templar, TileView) {
	// 		// Private Data And Functions
	// 		// --------------------------

	// 		// ...				
			
	// 		// Public Data And Functions
	// 		// -------------------------
	// 		_.extend(Tile, {

	// 			onStart : function(options) { console.log('onStart()');
	// 				this.tileView = new TileView({
	// 					'templar' : templar,
	// 					'model'   : new Backbone.Model({})
	// 				});
	// 			},

	// 			show : function() { console.log('show()');


	// 				this.tileView.render();
	// 			}
	// 		});

	// 	}, App.templar, TileView);

	// 	return TileModule;
	// });
});