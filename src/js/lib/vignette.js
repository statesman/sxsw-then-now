define(['jquery', 'imagesloaded'], function($) {

  function Vignette(el) {
    // Store references to important elements
    this.$el = $(el);

    this.$imgs = this.$el.find('.then-now-images');

    this.$thenImg = this.$imgs.find('img.then');
    this.$nowImg = this.$imgs.find('img.now');

    // Hide the then image
    this.$thenImg.hide();

    // Set some default state variables
    this.imgState = 'now';
    this.maxHeight = 0;

    // Setup slideshow navigation
    this.slideshowNav();

    // As soon as the images are loaded, trigger a resize
    this.$imgs
      .imagesLoaded()
      .always(this.size.bind(this));
  }

  // Size the vignette, based on size of images
  Vignette.prototype.size = function(heights) {
    var height = Math.max(this.$thenImg.height(), this.$nowImg.height());

    if(this.maxHeight !== height) {
      this.$imgs.height(height);
      this.maxHeight = height;
    }
  };

  // Setup the slideshow navigation
  Vignette.prototype.slideshowNav = function() {
    this.$thenButton = this.$el.find('.btn-then');
    this.$nowButton = this.$el.find('.btn-now');

    this.$thenButton.hover(this.then.bind(this));
    this.$nowButton.hover(this.now.bind(this));
  };

  // Public method to unbind all events
  Vignette.prototype.destroy = function() {
    this.$thenButton.off('hover');
    this.$nowButton.off('hover');
  };

  // Event handlers for then and now buttons
  Vignette.prototype.then = function() {
    if(this.imgState === 'now') {
      this.$thenImg.show();
      this.$nowImg.hide();
      this.imgState = 'then';
    }
  };

  Vignette.prototype.now = function() {
    if(this.imgState === 'then') {
      this.$thenImg.hide();
      this.$nowImg.show();
      this.imgState = 'now';
    }
  };

  return Vignette;

});
