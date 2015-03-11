require(['jquery', 'lib/modal', 'lib/debounce', 'lib/vignette', 'lib/intro', 'fittext'], function($, modal, debounce, Vignette) {

  'use strict';

  $(function() {
    var $grid = $('.grid-item');

    // Open the modal when a grid item is clicked
    $grid.on('click', '.hidden-xs', modal);

    // Setup all vignettes
    var vignettes = $grid.map(function(i, el) {
      return new Vignette(el);
    }).toArray();

    // Resize vignettes on window resize
    $(window).resize(debounce(function() {
      vignettes.forEach(function(v) {
        v.size();
      });
    }, 100));

    // Inflate Intro headline text
    $('.intro-hed').fitText(0.64, {
      maxFontSize: '100px'
    });
    // $('.intro-hed').last().fitText(0.575);
  });

});
