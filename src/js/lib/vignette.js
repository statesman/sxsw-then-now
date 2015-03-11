define(['jquery'], function($) {

  function Vignette(el) {
    // Store references to important elements
    this.$el = $(el);

    this.$imgs = this.$el.find('.then-now-images');

    this.$thenImg = this.$imgs.find('.then');
    this.$nowImg = this.$imgs.find('.now');

    // Attach to Sublime player
    sublime.ready(function(){
      var video = this.$el.find('video')[0];
      if(typeof video !== "undefined") {
        this.video = video;
        this._setupVideo();
      }
    }.bind(this));

    // Set some default state variables
    this.imgState = 'now';

    // Setup slideshow navigation
    this._setupSlideshow();
  }

  // Public method to unbind all events
  Vignette.prototype.destroy = function() {
    this.$thenButton.off('hover');
    this.$nowButton.off('hover');

    if(typeof this.video !== "undefined") {
      this.$videoButton.off('click');
      sublime.unprepare(this.video);

      this.$closeVideoButton.off('click');
    }
  };

  // Event handlers for then and now buttons
  Vignette.prototype.then = function() {
    if(this.imgState === 'now') {
      this.$thenImg.show();
      this.$nowImg.hide();
      this.$nowButton.removeClass('active');
      this.$thenButton.addClass('active');
      this.imgState = 'then';
    }
  };
  Vignette.prototype.now = function(cb) {
    if(this.imgState === 'then') {
      this.$thenImg.hide();
      if(typeof cb == "function") {
        this.$nowImg.fadeIn(cb);
      }
      else {
        this.$nowImg.show();
      }
      this.$nowButton.addClass('active');
      this.$thenButton.removeClass('active');
      this.imgState = 'now';
    }
  };

  // Setup the slideshow navigation
  Vignette.prototype._setupSlideshow = function() {
    this.$thenButton = this.$el.find('.btn-then');
    this.$nowButton = this.$el.find('.btn-now');

    this.$thenButton.hover(this.then.bind(this));
    this.$nowButton.hover(this.now.bind(this));
  };

  // Setup the video player trigger
  Vignette.prototype._setupVideo = function() {
    this.$videoButton = this.$el.find('.video-play');

    // Setup the video close button
    this.$closeVideoButton = this.$el.find('.btn-video-close');
    this.$closeVideoButton
      .on('click', this._destroyVideo.bind(this));

    this.$videoButton.on('click', function(e) {
      e.preventDefault();

      // Store the unaltered <video> el so we can add it back later; Sublime
      // will remove it on sublime.unprepare()
      this._video = this.video;

      // Create the video player
      sublime.prepare(this.video, function(player) {
        if(this.$el.hasClass('vex-content')) {
          player.setSize(this.$el.innerWidth() - 17, (this.$el.innerWidth() - 17) / 1.77);
        }
        else {
          player.setSize(this.$el.width(), this.$el.width() / 1.77);
        }

        // Save a reference to the video player so we sublime.unprepare()
        // on this.destroy()
        this.player = player;

        // Toggle buttons/images
        this.$thenButton.fadeOut();
        this.$nowButton.fadeOut();
        this.$thenImg.fadeOut();
        this.$closeVideoButton.fadeIn();
        this.$nowImg.fadeOut(function() {
          this.$el.find('.video-wrapper').show();
        }.bind(this));

        // Scroll to the top; scroll the div if we're in a modal and scroll
        // the body if we're in not
        if(this.$el.hasClass('vex-content')) {
          this.$el.animate({
            scrollTop: 0
          }, 250);
        }
        else {
          $('body, html').animate({
            scrollTop: this.$el.offset().top
          }, 250);
        }

        // When the video is done playing ...
        player.on('end', this._destroyVideo.bind(this));
      }.bind(this));
    }.bind(this));
  };

  Vignette.prototype._destroyVideo = function() {
    // Fade back in the buttons
    this.$thenButton.fadeIn();
    this.$nowButton.fadeIn();
    this.$closeVideoButton.fadeOut();

    this.$el.find('.video-wrapper').hide();

    // Create a callback that will unprepare the video and restore
    // the original <video> tag (unless the user wants to replay)
    var cb = function() {
      sublime.unprepare(this.video);

      this.$el.find('.video-wrapper').html(this._video);
      this.video = this._video;
    }.bind(this);

    // Go back to the "now" image and fire the video unpreparer when
    // the image is done fading in
    this.imgState = 'then';
    this.now(cb);
  };

  return Vignette;

});
