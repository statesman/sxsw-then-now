require(['jquery', 'vex', 'lib/spin'], function($, vex, spin) {

  'use strict';

  $(function() {
    // spin.spin();

    // Load the data
    // $.getJSON('data/data.json', function(d) {});

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

    vex.defaultOptions.className = 'vex-theme-plain';

    $('.grid-item').on('click', openDialog);

    function openDialog(e) {
      e.preventDefault();
      vex.open({
        content: '<div>Content</div>',
        /*
        afterOpen: function($vexContent) {
          return $vexContent.append($el);
        },
        afterClose: function() {
          return console.log('vexClose');
        }
        */
      });
    }

  });

});
