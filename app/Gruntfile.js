module.exports = function (grunt) {

    var jsFiles = ['colorbox-master/**/*.js'],
        cssFiles = ['colorbox-master/**/*.css'];

    // Configuring Grunt modules
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            eslint: {
                files: jsFiles,
                tasks: ['eslint'],
                options: {
                    spawn: false
                }
            },
            lesshint: {
                files: cssFiles,
                tasks: ['lesshint'],
                options: {
                    spawn: false
                }
            }
        },

        eslint: {
            extends: "eslint:recommended",
            src: jsFiles,
            options: {
                configFile: "conf/.eslintrc"    
            } 
        },

        lesshint: {
            your_target: cssFiles,
            options: {
                lesshintrc: 'conf/.lesshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks('grunt-lesshint');

    grunt.registerTask('default', ['eslint', 'lesshint']);

    //On watch events, inject only the changed files into the config
    grunt.event.on('watch', function(action, filepath) {    	
    	grunt.config(['eslint', 'src'], [filepath]);
        grunt.config(['lesshint', 'your_target'], [filepath]);
    });
};
