/*global module:false*/
module.exports = function(grunt) {
    'use strict';

//    var _  = grunt.util._ ;
//    var config = require('./require.config');
//    config.shim = { app:[] };

//  for (var i in config.config.app.dataStash){
//    config.shim.app.push(config.config.app.dataStash[i]);
//  }


    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
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
                src: ['src/**/*.js']
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'style',
                    src: ['style.scss'],
                    dest: 'web/css',
                    ext: '.css'
                }]
            }
        },
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'web/js',
                options: {
                    module:            'amd', //or commonjs
                    target:            'es5', //or es3
                    base_path:         'src',
                    sourcemap:         true,
                    fullSourceMapPath: true,
                    declaration:       true
                }
            }
        },
        copy: {
            main: {
                files: [
                    // Copy all submodules
                    {
                        expand: true,
                        cwd: 'submodules',
                        src:  '**',
                        dest: 'web/submodules/'
                    },
                ]
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
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
    grunt.registerTask('default', [ 'typescript', 'tslint', 'sass', 'copy']);

};
