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
                    // title bar
                    "client/web/static/templates/title-bar-layout.js":          "client/web/js/templates/title-bar-layout.hbs",
                    // side bar nav
                    "client/web/static/templates/sidebar-nav-layout.js":        "client/web/js/templates/sidebar-nav-layout.hbs",
                    // login
                    "client/web/static/templates/login-layout.js":              "client/web/js/templates/login-layout.hbs",
                    // user
                    "client/web/static/templates/user-layout.js":               "client/web/js/templates/user-layout.hbs",
                    // user followers
                    "client/web/static/templates/user-followers-layout.js":     "client/web/js/templates/user-followers-layout.hbs",
                    // tweet item view
                    "client/web/static/templates/tweet-item-view.js":           "client/web/js/templates/tweet-item-view.hbs",
                    // user item view
                    "client/web/static/templates/user-item-view.js":            "client/web/js/templates/user-item-view.hbs"
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