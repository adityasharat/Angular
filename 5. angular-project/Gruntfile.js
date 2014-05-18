/*global module:true */
module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * ### clean
         * grunt-contrib-clean
         * Deletes the <string> paths in the array
         */
        clean: {
            clean: ['dist']
        },

        /**
         * ### compass
         * grunt-contrib-compass
         * compiles, minifies and concats sass to css
         */
        compass: {
            dev: {
                options: {
                    sassDir: 'src/client/sass',
                    cssDir: 'dist/client/css',
                    imagesDir: 'images',
                    javascriptsDir: 'src',
                    environment: 'development',
                    outputStyle : 'expanded'
                }
            }
        },

        /**
         * ### copy
         * grunt-contrib-copy
         * copies the files from src to dist
         */
        copy : {
            dev : {
                files : [
                    {
                        expand : true,
                        cwd : 'src/',
                        src : ['**/*.*', '!**/sass/**'],    //, '!**/*.js'
                        dest : 'dist/'
                    },
                    {
                        expand : true,
                        cwd : 'lib/dev',
                        src : ['**'],
                        dest : 'dist/client/lib'
                    },
                    {
                        expand : true,
                        cwd : 'images',
                        src : ['**'],
                        dest : 'dist/client/images'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'compass:dev', 'copy:dev']);
};