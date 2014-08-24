module.exports = function(grunt) {
  grunt.initConfig({
    // Read the grunt file for variables
    pkg: grunt.file.readJSON('package.json'),
    // Configure js uglify
    uglify: {
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> -  <%= grunt.template.today("dd-mm-yyyy") %> - dev build */\n',
          mangle: true,
          compress: true,
          sourceMap: true,
          sourceMapIncludeSources: true
        },
        files: {
          'assets/js/<%= pkg.name %>.min.js': ['_src/js/*.js', '_bower/jquery/dist/jquery.js']
        }
      },
      deploy: {
          options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> - deploy build */\n',
          mangle: true,
          compress: true
        },
        files: {
          'assets/js/<%= pkg.name %>.min.js': ['_src/js/*.js']
        }
      }
    },
    // Configure Sass compilation
    sass: {
      options: {
        // Add the various Bourbon sources to the sass load path
        loadPath: [
          '_bower/bourbon/dist',
          '_bower/neat/app/assets/stylesheets',
          '_bower/bitters/app/assets/stylesheets',
          '_bower/font-awesome/scss'
        ]
      },
      dev: {
        options: {
          style: 'compressed',
          sourcemap: 'inline'
        },
        files: {
          'assets/css/felixjung.io.min.css': '_src/sass/main.scss'
        }
      },
      deploy: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'assets/css/felixjung.io.min.css': '_src/sass/main.scss'
        }
      }
    },
    // Configure Jekyll
    jekyll: {
      serve: {
        options: {
          serve: true
        }
      },
      dev: {
        options: {
          serve: false,
          drafts: true,
          future: true,
          limit_posts: 20
        }
      },
      deploy: {
        options: {
          serve: false,
          drafts: false,
          future: false
        }
      }
    },
    // Copy
    copy: {
      fontawesome: {
        files: [{
          expand: true,
          cwd: '_bower/font-awesome/',
          src: ['fonts/*'],
          dest: 'assets/'
        }]
      }
    },
    // Configure watch
    watch: {
      // Rebuild Jekyll site
      jekyll: {
        files: [
          '_includes/*.html',
          '_layouts/*.html',
          'index.html',
          '_posts/*.md',
          '_config.yml'
        ],
        tasks: ['jekyll:dev']
      },
      // Sass files
      sass: {
        files: ['_src/sass/*.scss'],
        tasks: ['sass:dev']
      },
      // Uglify
      uglify: {
        files: ['_src/js/*.js'],
        tasks: ['uglify:dev']
      },
      options: {
        interrupt: true,
        atBegin: true,
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('serve', ['copy', 'sass:dev', 'uglify:dev', 'jekyll:serve']);
  grunt.registerTask('default', 'serve');
  grunt.registerTask('deploy', ['copy', 'sass:deploy', 'uglify:deploy', 'jekyll:deploy']);
};