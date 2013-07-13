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
            dist: {
                src: ['src/blender.js', 'src/blender-ext.js'],
                dest: 'blender.js',
                options: {
                    banner: '(function() {\n\n',
                    footer: '\n}());',
                    separator: '\n\n'
                }
            },
            require: {
                src: ['src/blender.js', 'src/blender-ext.js'],
                dest: 'blender-require.js',
                options: {
                    banner: 'define([\'backbone\'], function(Backbone) {\n\n',
                    footer: '\nreturn Backbone.View.extendWithMixin;\n\n});',
                    separator: '\n\n'
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'blender.min.js': ['blender.js'],
                    'blender-require.min.js': ['blender-require.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dist', ['concat:dist', 'concat:require', 'uglify:dist']);
};