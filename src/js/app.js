require(['jquery', 'lib/spin', 'backbone', 'collections/people', 'lib/router'], function($, spin, Backbone, People, Router) {

  'use strict';

  $(function() {
    // spin.spin();

    // Load the data
    $.getJSON('data/data.json', function(d) {

      new Router({
        people: new People(d)
      });

      Backbone.history.start();

    });

    /*
    vex.defaultOptions: {
      content: '',
      showCloseButton: true,
      escapeButtonCloses: true,
      overlayClosesOnClick: true,
      appendLocation: 'body',
      className: '',
      css: {},
      overlayClassName: '',
      overlayCSS: {},
      contentClassName: '',
      contentCSS: {},
      closeClassName: '',
      closeCSS: {}
    };
    */

  });

});
