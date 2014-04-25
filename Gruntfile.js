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
    watch: {
      sass: {
        files: ['sass/*.scss'],
        tasks: ['compass']
      },
      js: {
        files: ["js/**/*.js"],
        tasks: [],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['css/*.css'],
        options: { livereload: true }
      }
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
              PORT: 5000
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

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  
  grunt.registerTask('default', ['compass', 'concurrent:dev']);
  grunt.registerTask('build', ['compass']);
};