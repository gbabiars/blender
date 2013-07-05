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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

};