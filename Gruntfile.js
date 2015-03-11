module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Clean files from dist/ before build
    clean: {
      css: ["public/dist/*.css", "public/dist/*.css.map"],
      js: ["public/dist/*.js", "public/dist/*.js.map"],
      images: ["public/assets/grid/**", "public/assets/now/**"],
      fonts: ["public/fonts/**"]
    },

    // Copy FontAwesome files to the fonts/ directory
    copy: {
      fonts: {
        src: [
          'bower_components/font-awesome/fonts/**'
        ],
        dest: 'public/fonts/',
        flatten: true,
        expand: true
      },
      posters: {
        src: 'photos/posters/*.jpg',
        dest: 'public/assets/posters/',
        flatten: true,
        expand: true
      }
    },

    // Transpile LESS
    less: {
      options: {
        sourceMap: true,
        paths: ['bower_components/bootstrap/less']
      },
      prod: {
        options: {
          compress: true,
          cleancss: true
        },
        files: {
          "public/dist/style.css": "src/css/style.less"
        }
      }
    },

    // Run our JavaScript through JSHint
    jshint: {
      js: {
        src: ['src/js/**/*.js']
      }
    },

    // Runs the r.js optimizer
    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/js',
          mainConfigFile: 'src/js/config.js',
          out: 'public/dist/scripts.js',
          optimize: 'uglify2',
          include: [
            'app'
          ],
          name: '../../bower_components/almond/almond',
          generateSourceMaps: true,
          preserveLicenseComments: false
        }
      }
    },

    // Watch for changes in LESS and JavaScript files,
    // relint/retranspile when a file changes
    watch: {
      options: {
        livereload: true
      },
      markup: {
        files: ['public/index.php']
      },
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['jshint', 'clean:js', 'requirejs']
      },
      styles: {
        files: ['src/css/**.less'],
        tasks: ['clean:css', 'less']
      }
    },

    // Deploy to CMG servers with FTP
    ftpush: {
      stage: {
        auth: {
          host: 'host.coxmediagroup.com',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: '/stage_aas/projects/news/sxsw-then-now',
        exclusions: ['dist/tmp','Thumbs.db'],
        simple: true,
        useList: false
      },
      prod: {
        auth: {
          host: 'host.coxmediagroup.com',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: '/prod_aas/projects/news/sxsw-then-now',
        exclusions: ['dist/tmp','Thumbs.db'],
        simple: true,
        useList: false
      }
    },

    // Size images
    responsive_images: {
      grid: {
        options: {
          sizes: [{
            width: 450,
            height: 300,
            aspectRatio: false
          }]
        },
        files: [{
          expand: true,
          src: ['**/*.{jpg,JPG}'],
          cwd: 'photos/grid/',
          dest: 'public/assets/grid/'
        }]
      },
      inside: {
        options: {
          sizes: [{
            width: 800
          }]
        },
        files: [{
          expand: true,
          src: ['now/*.jpg', 'then/*.jpg'],
          cwd: 'photos/',
          dest: 'public/assets/'
        }]
      },
      thumbs: {
        options: {
          sizes: [{
            width: 225
          }]
        },
        files: [{
          expand: true,
          src: ['**/*.jpg'],
          cwd: 'photos/posters',
          dest: 'public/assets/thumbs'
        }]
      }
    },

    // Parse ArchieML files
    archieml: {
      vignettes: {
        options: {
          processFile: function(file) {
            var md = require('marked');

            file.vignette = md(file.vignette);
            return file;
          }
        },
        files: [{
          src: ['vignettes/*.aml'],
          dest: 'public/data/data.json'
        }]
      }
    }

  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-ftpush');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-archieml');

  grunt.registerTask('build:images', ['clean:images', 'copy:posters', 'responsive_images'])

  grunt.registerTask('default', ['jshint', 'clean:css', 'clean:js', 'clean:fonts', 'archieml', 'copy:fonts', 'less', 'requirejs']);

};
