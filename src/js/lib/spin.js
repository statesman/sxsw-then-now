define(['spinner'], function(Spinner) {

  'use strict';

  var target = document.getElementById('spin');

  var spinner = new Spinner({
    lines: 13,
    length: 20,
    width: 10,
    radius: 30,
    corners: 1,
    color: '#000',
    speed: 1,
    trail: 60,
    shadow: false,
    hwaccel: true,
    zIndex: 100000
  });

  return {
    spin: function() {
      spinner.spin(target);
    },
    stop: function() {
      spinner.stop();
    }
  };

});
