require(['jquery', 'vex'], function($, vex) {

  'use strict';

  $(function() {
    vex.defaultOptions.className = 'vex-theme-plain';
    vex.defaultOptions.contentClassName = 'vignette';

    $('.grid-item').on('click', '.hidden-xs', modal);

    function modal(e) {
      var content = $(e.target).closest('.grid-item').find('.vignette').html();

      vex.open({
        content: content
      });
    }
  });

});
