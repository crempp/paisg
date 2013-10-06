/*global module:false*/
module.exports = function(grunt) {
    'use strict';

    var _  = grunt.util._ ;
    var config = require('./require.config');

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/style',
                    src: ['style.scss'],
                    dest: 'web/css',
                    ext: '.css'
                }]
            }
        },
        requirejs: {
            app:{
                options: _.merge(config, {
                    findNestedDependencies:true,
                    optimize: "none",
                    baseUrl:  "src/scripts",
                    name:     "main",
                    mainConfigFile: "require.config.js",
                    out:      "web/js/application.js"
                })
            }
        },
        copy: {
            main: {
                files: [
                    // Copy index
                    {
                        expand: true,
                        cwd: 'src',
                        src:  'index.html',
                        dest: 'web/'
                    },
                    // Copy external libraries
                    {
                        expand: true,
                        cwd: 'src/lib',
                        src:  '**',
                        dest: 'web/js/lib/'
                    },
                    // Copy all submodules
                    {
                        expand: true,
                        cwd: 'subroutines',
                        src:  '**',
                        dest: 'web/js/subroutines/'
                    },
                    // Copy assets
                    {
                        expand: true,
                        cwd: 'src/assets',
                        src:  '**',
                        dest: 'web/assets/'
                    },
                    // Copy main require.js file
                    {
                        expand: true,
                        cwd: 'src/scripts',
                        src:  'main.js',
                        dest: 'web/js/'
                    },
                    // Copy Seth's scripts
                    {
                        expand: true,
                        cwd: 'src/scripts/modules/GL',
                        src:  '**/*.js',
                        dest: 'web/js/GL'
                    }
                ]
            }
        },
        watch: {
            copy: {
                files: ['index.html', 'scr/lib/**', 'subroutines/**', 'src/assets/**', 'scr/main.js'],
                tasks: ['copy']
            },
            sass: {
                files: 'src/style/**/*.scss',
                tasks: ['sass']
            },
            requirejs: {
                files: 'src/scripts/**/*.js',
                tasks: ['requirejs']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');


    //test out just the require.js task
    grunt.registerTask('build',['requirejs']);

    // Default task
    grunt.registerTask('default', ['requirejs', 'sass', 'copy']);

};
