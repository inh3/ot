define([    "models/loginModel",
            "appUser",
            "vent",
            "underscore",
            "handlebars",
            "templates/login-layout",
            "marionette"],
function(   LoginModel,
            AppUser,
            EventAggregator,
            _,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        tagName: "div",
        className: "panel panel-default",

        template: Handlebars.templates["login-layout.hbs"],

        ui: {
            userNameLogin:      "#login-user-name",
            passwordLogin:      "#login-password",
            loginButton:        "#login-button",

            errorText:          ".error-text"
        },

        events: {
            "keyup #login-user-name":       "loginKeyPress",
            "keyup #login-password":        "loginKeyPress",
            "click #login-button":          "loginButtonClick"
        },

        initialize: function() {
            //console.log("loginLayout - initialize");
            this.loginModel = new LoginModel();

            // debounce the login buttons
            this.loginButtonClick = _.debounce(this.loginButtonClick, 1000, true);

            // login complete event
            this.listenTo(EventAggregator, "user:login:complete", this.loginFailed);
        },

        onRender: function() {
            this.ui.errorText.addClass('hidden');
            this.delegateEvents();
        },

        loginKeyPress: function(event) {
            this.loginModel.set({ "userName": this.ui.userNameLogin.val().trim() });
            this.loginModel.set({ "password": this.ui.passwordLogin.val().trim() });
            this.loginModel.isValid() ? this.ui.loginButton.removeAttr("disabled") : this.ui.loginButton.attr("disabled", '');

            // enter has been pressed
            if (event.which == 13 || event.keyCode == 13) {
                if(this.loginModel.isValid()) {
                    AppUser.userLogin(this.loginModel.toJSON());
                }
            }
        },

        loginButtonClick: function() {
            AppUser.userLogin(this.loginModel.toJSON());
        },

        loginFailed: function(loginSuccess) {
            if(loginSuccess === false) {
                this.ui.errorText.removeClass('hidden');
            }
        }
    });
});