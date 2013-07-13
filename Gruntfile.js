'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        watch: {
            jshint: {
                files: ['src/**/*.js'],
                tasks: ['jshint:src']
            },
            karma: {
                files: ['src/**/*.js', 'test/**/*.js'],
                tasks: ['karma:unit:run']
            }
        },

        jshint: {
            src: ['src/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            }
        },

        concat: {
            options: {
                banner: '(function() {\n\n',
                footer: '\n}());',
                separator: '\n\n'
            },
            dist: {
                src: ['src/blender.js', 'src/blender-ext.js'],
                dest: 'dist/blender.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/blender.min.js': ['dist/blender.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};