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

    // Pre-render Handlebars templates
    handlebars: {
      options: {
        // Returns the filename, with its parent directory if
        // it's in a subdirectory of the src/templates folder
        processName: function(filePath) {
          var path = filePath.toLowerCase(),
              pieces = path.split("/"),
              name = '';
          if(pieces[pieces.length - 2] !== 'templates') {
            name = name + pieces[pieces.length - 2];
          }
          name = name + pieces[pieces.length - 1];
          return name.split(".")[0];
        },
        amd: true
      },
      compile: {
        files: {
          'build/templates.js': ['src/templates/**/*.hbs']
        }
      }
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
        tasks: ['clean:css', 'copy:vex', 'less']
      },
      templates: {
        files: ['src/templates/**/*.hbs'],
        tasks: ['clean:js', 'handlebars', 'requirejs']
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
        dest: '/stage_aas/projects/news/template',
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
        dest: '/prod_aas/projects/news/template',
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
            width: 400,
            height: 267,
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
          src: ['**/*.{jpg,JPG}'],
          cwd: 'photos/now',
          dest: 'public/assets/now/'
        }]
      }
    },

    // Parse ArchieML files
    archieml: {
      vignettes: {
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
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-ftpush');
  grunt.loadNpmTasks('grunt-responsive-images');

  // Include our custom task to parse Archie files
  grunt.registerMultiTask('archieml', 'Parse ArchieML files.', function() {
    var archieml = require('archieml');

    this.files.forEach(function(file) {
      // Filter out files that don't exist
      var parsed = file.src.filter(function(src) {
        if (!grunt.file.exists(src)) {
          grunt.log.warn('Source file "' + src + '" not found.');
          return false;
        } else {
          return true;
        }
      })
      // Parse files
      .map(function(src) {
        grunt.log.writeln('Parsing "' + src);
        return archieml.load(grunt.file.read(src));
      });

      // Write parsed contents to destination(s)
      grunt.file.write(file.dest, JSON.stringify(parsed));

      // Save parsed JSON file
      grunt.log.oklns('Saved parsed ArchieML file(s) as JSON at "' + file.dest + '".');
    });
  });

  grunt.registerTask('build:images', ['clean:images', 'responsive_images'])

  grunt.registerTask('default', ['jshint', 'clean:css', 'clean:js', 'clean:fonts', 'archieml', 'copy', 'less', 'handlebars', 'requirejs']);

};
