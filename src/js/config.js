require.config({
  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    imagesloaded: '../../bower_components/imagesloaded/imagesloaded.pkgd',
    vex: '../../bower_components/vex/js/vex',
    fittext: '../../bower_components/FitText.js/jquery.fittext'
  },
  shim: {
    imagesloaded: {
      deps: ['jquery']
    },
    fittext: {
      deps: ['jquery']
    }
  }
});
