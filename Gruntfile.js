module.exports = function(grunt) {
  grunt.initConfig({
    compass: {
      build: {
        options: {
          cssDir: 'css'
        },
        files: {
          'css/app.css': 'sass/app.scss'
        }
      }
    },
    concat: {
      options: {
        separator: '',
      },
      css: {
        src: ['css/animate.min.css', 'css/app.css'],
        dest: 'css.css',
      },
      js: {
        src: ['js/livereload.js', 'js/jquery.min.js', 'js/app.js'],
        dest: 'js.js',
      },
      jsdist: {
        src: ['js/jquery.min.js', 'js/app.js'],
        dest: 'js.js',
      },
    },
    watch: {
      sass: {
        files: ['sass/*.scss'],
        tasks: ['compass']
      },
      js: {
        files: ["js/**/*.js"],
        tasks: ['concat:js']
      },
      css: {
        files: ['css/*.css'],
        tasks: ['concat:css']
      },
      assets: {
        files: ["js.js", "css.css"],
        tasks: [],
        options: {
          livereload: true
        }
      },
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: [],
          ignore: ['js/**'],
          ext: 'js',
          nodeArgs: ['--debug'],
          delayTime: 1,
          env: {
              PORT: 80
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['watch', 'nodemon'],
        options: {
            logConcurrentOutput: true
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  
  grunt.registerTask('default', ['compass', 'concat:css', 'concat:js', 'concurrent:dev']);
  grunt.registerTask('build', ['compass', 'concat:css', 'concat:jsdist']);
};