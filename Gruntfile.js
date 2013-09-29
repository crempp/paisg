/*global module:false*/
module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        tslint: {
            options: {
                configuration: {
                    classname:            true,
                    curly:                true,
                    dupkey:               true,
                    'duplicate-variable': true,
                    eqeqeq:               true,
                    indent:               true,
                    labelpos:             true,
                    'label-undefined':    true,
                    newcap:               true,
                    nounreachable:        true,
                    noempty:              true,
                    radix:                true,
                    semicolon:            true
                }
            },
            files: {
                src: ['src/scripts/**/*.ts']
            }
        },
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
        typescript: {
            base: {
                //cwd: 'src/scripts',
                //src: ['**/*.ts'],
                src: ['src/scripts/App.ts'],
                //src: ['./App.ts'],
                dest: 'web/js/app',
                options: {
                    module:            'amd', //or commonjs
                    target:            'es5', //or es3
                    base_path:         'src/scripts',
                    //baseUrl:           'js',
                    sourcemap:         true,
                    fullSourceMapPath: true,
                    declaration:       true
                }
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
                        cwd: 'src',
                        src:  'main.js',
                        dest: 'web/js/'
                    }
                    // Until Seth rewrites his stuff in TypeScript copy GL
//                    {
//                        expand: true,
//                        cwd: 'src/scripts/modules/GL',
//                        src:  '**/*.js',
//                        dest: 'web/js/GL'
//                    },
                ]
            }
        },
        watch: {
            copy: {
                files: ['index.html', 'scr/lib/**', 'subroutines/**', 'src/assets/**', 'scr/main.js'],
                tasks: ['copy']
            },
            sass: {
                files: 'style/**/*.scss',
                tasks: ['sass']
            },
            typescript: {
                files: 'src/**/*.ts',
                tasks: ['typescript']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-tslint');


    //test out just the require.js task
    grunt.registerTask('build',['requirejs']);

    // Default task
    grunt.registerTask('default', [ 'tslint', 'typescript', 'sass', 'copy']);

    grunt.registerTask('compile', [ 'typescript' ]);

};
