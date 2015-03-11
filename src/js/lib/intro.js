define(function() {

  'use strict';

  var lights = {
    off: function() {
      $('#intro').removeClass('video-playing');
    },
    on: function() {
      $('#intro').addClass('video-playing');
    }
  };

  sublime.ready(function(){
    var player = sublime.player('intro-video');

    player.on({
      play: lights.on,
      end: lights.off,
      pause: lights.off,
      stop: lights.off
    });

  });

});
