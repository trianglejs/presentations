define([
    'marionette'
], function(
    Marionette
){
    var TileView = Backbone.Marionette.ItemView.extend({

        el : '.tile-wrap',

        template : function(model) {
            return this.templar.render({
                path : 'tile',
                el   : this.$el,
                data : model
            });
        },

        events : {
            'click .btn' : 'flip'
        },

        ui: {
            settingsBtn : 'button.settings',
            cancelBtn   : 'button.cancel',
            saveBtn     : 'button.save',
            nameField   : 'input[type=text]',
            tile        : '.tile'
        },

        model : new Backbone.Model({}),

        initialize : function(options) {
            _.bindAll(this);

            this.templar = Marionette.getOption(this, 'templar');
            this.model   = Marionette.getOption(this, 'model');
            this.debug   = Marionette.getOption(this, 'debug');

            if ( this.debug ) {
                console.group('Explaining getOption()');
                    console.log(options.model);
                    console.log(this.model);

                    console.log(options.templar);
                    console.log(this.templar);
                console.groupEnd();

                console.group('Explaining differences between ui pragma and regular jquery selection');
                    console.log(this.ui.saveBtn);
                    console.log(this.$el.find('button.save'));
                console.groupEnd();
            }
        },

        flip : function(e) {
            this.ui.tile.toggleClass('flipped');
        },

        onClose : function(e) { if ( this.debug ) console.info('TileView.close()');
            //.. 
        }
    });

    return TileView;
});