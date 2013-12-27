 module.exports = function(grunt) {
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     uglify: {
       options: {
         banner: '/**\n * <%= pkg.name %>\n * API: <%= pkg.API %>\n * Author: <%= pkg.author %>\n */\n'
       },
       js: {
         files: [{
           src: 'lib/js/jquery.idialog.js',
           dest: 'lib/js/jquery.idialog.min.js',
           ext: '.js'
         }]
       }
     },
     jshint: {
       files: ['lib/js/jquery.idialog.js'],
       options: {
         // options here to override JSHint defaults
         globals: {
           jQuery: true,
           console: true,
           module: true,
           document: true
         }
       }
     }
   });
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.registerTask('default', ['uglify']);
 };