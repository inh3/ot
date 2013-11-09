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
                    // navigation bar
                    "client/web/static/templates/navigation-bar-layout.js":             "client/web/js/templates/navigation-bar-layout.hbs",

                    // side bar
                    "client/web/static/templates/side-bar-layout.js":                   "client/web/js/templates/side-bar-layout.hbs",

                    // login
                    "client/web/static/templates/login-layout.js":                      "client/web/js/templates/login-layout.hbs",

                    // user tweets
                    "client/web/static/templates/user-tweets-layout.js":                "client/web/js/templates/user-tweets-layout.hbs",
                    // user followers
                    "client/web/static/templates/user-followers-layout.js":             "client/web/js/templates/user-followers-layout.hbs",
                    // user following
                    "client/web/static/templates/user-following-layout.js":             "client/web/js/templates/user-following-layout.hbs",

                    // user tweets composite view
                    "client/web/static/templates/user-tweets-composite-view.js":        "client/web/js/templates/user-tweets-composite-view.hbs",
                    // user followers composite view
                    "client/web/static/templates/user-followers-composite-view.js":     "client/web/js/templates/user-followers-composite-view.hbs",
                    // user following composite view
                    "client/web/static/templates/user-following-composite-view.js":     "client/web/js/templates/user-following-composite-view.hbs",

                    // tweet item view
                    "client/web/static/templates/tweet-item-view.js":                   "client/web/js/templates/tweet-item-view.hbs",
                    // user item view
                    "client/web/static/templates/user-item-view.js":                    "client/web/js/templates/user-item-view.hbs"
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