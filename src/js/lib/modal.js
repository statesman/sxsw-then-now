define(['vex', 'lib/vignette'], function(vex, Vignette) {

  vex.defaultOptions.className = 'vex-theme-plain';
  vex.defaultOptions.contentClassName = 'vignette';

  return function(e) {
    e.preventDefault();

    // Pluck the vignette content from the mobile display
    // to use it as the modal content
    var content = $(e.target).closest('.grid-item')
      .find('.vignette')
      .html()
      .toString();

    var self = this;
    vex.open({
      content: content,
      afterOpen: function($vexContent) {
        self.vignette = new Vignette($vexContent);
      },
      afterClose: function() {
        self.vignette.destroy();
      }
    });
  };

});
