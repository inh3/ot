module.exports = function(grunt) {

    // Configuration goes here
    grunt.initConfig({
        // read package file for settings/dependencies
        pkg: grunt.file.readJSON('package.json'),

        // handlebars template precompile
        handlebars: {
            compile: {
                options: {
                    namespace: 'Handlebars.templates',
                    processName: function (filePath) {
                        var pieces = filePath.split('/');
                        return pieces[pieces.length - 1];
                    },
                    amd: true
                },
                files: {
                }
            }
        }
    });

    // plugins

    grunt.loadNpmTasks('grunt-contrib-handlebars');

    // tasks

    grunt.registerTask('default', function () {
        grunt.log.write("Default task...").ok();
    });
    grunt.registerTask('custom', function() {
        grunt.log.write('Custom task running...').ok();
    });

    // handlebars compile
    grunt.registerTask('hbs', [ 'handlebars' ]);
};