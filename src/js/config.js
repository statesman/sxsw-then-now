require.config({
  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    imagesloaded: '../../bower_components/imagesloaded/imagesloaded.pkgd',
    vex: '../../bower_components/vex/js/vex'
  },
  shim: {
    imagesloaded: {
      deps: ['jquery']
    }
  }
});
