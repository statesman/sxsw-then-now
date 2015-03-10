define(['vex'], function(vex) {

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

    vex.open({
      content: content
    });
  };

});
