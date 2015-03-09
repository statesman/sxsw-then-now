define(['backbone', 'tpl', 'vex'], function(Backbone, tpl, vex) {

  'use strict';

  return Backbone.View.extend({

    initialize: function() {
      this.render();
    },

    template: tpl.vignette,

    render: function() {

      vex.defaultOptions.className = 'vex-theme-plain';

      var self = this;
      vex.open({
          content: this.template(this.model.toJSON())
        })
        .bind('vexClose', function() {
          self.trigger('closed');
        });

    }

  });

});
