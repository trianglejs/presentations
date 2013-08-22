define([
    'marionette',
    'module/tile/tile'
],
function(
    Marionette,
    Tile
){
	var IndexController = Marionette.Controller.extend({
		initialize : function(options) {
			// Controller initialize code here...
		},

		tilesMarionette : function() { if ( this.debug ) console.info('IndexController.tilesMarionette()');
					
			this.app = require('app');

			this.tileModule = this.app.module('Tile', Tile);

			// BAD 
			// this.app.Tile.start();

			// Can get confusing with assignment
			// this.app.Tile = 'foo';

			// BETTER
			// this.app.module('Tile').start();

			// BEST
			this.tileModule.start({
				debug      : this.app.config.debug,
				modulePath : this.app.config.module.path
			});

			// run the module's show method
			this.tileModule.show();

			// stop module and cleanup memory usage and fire onStop event
			// this.tileModule.stop();

		}
	});

	return IndexController;
});