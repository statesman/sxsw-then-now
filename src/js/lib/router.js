define(['backbone', 'views/vignette'], function(Backbone, Vignette) {

  'use strict';

  return Backbone.Router.extend({

    initialize: function(options) {
      this.people = options.people;
    },

    /* Routes */

    routes: {
      ':slug': 'person'
    },

    /* Controllers */

    person: function(slug) {
      // Render a new modal overlay
      this.vignette = new Vignette({
        model: this.people.get(slug)
      });

      // Listen for the modal to close and return to grid when it does
      this.vignette.once('closed', function() {
        this.navigate('#/', {trigger: true});
      }, this);
    }

  });

});
