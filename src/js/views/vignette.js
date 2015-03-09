define(['backbone', 'vex'], function(Backbone, vex) {

  'use strict';

  return Backbone.View.extend({

    initialize: function() {
      this.render();
    },

    render: function() {

      vex.defaultOptions.className = 'vex-theme-plain';

      var self = this;
      vex.open({
          content: '<div>' + this.model.get('slug') + '</div>',
          /*
          afterOpen: function($vexContent) {
            return $vexContent.append($el);
          },
          afterClose: function() {
            return console.log('vexClose');
          }
          */
        })
        .bind('vexClose', function() {
          self.trigger('closed');
        });

    }

  });

});
