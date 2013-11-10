define([    "models/loginModel",
            "models/signUpModel",
            "appUser",
            "vent",
            "underscore",
            "handlebars",
            "templates/login-layout",
            "marionette"],
function(   LoginModel,
            SignUpModel,
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

            userNameSignUp:     "#username-sign-up",
            passwordSignUp:     "#password-sign-up",
            emailSignUp:        "#email-sign-up",
            soundByteSignUp:    "#sound-byte-sign-up",
            signUpButton:       "#sign-up-button"
        },

        events: {
            "keyup #login-user-name":       "loginKeyPress",
            "keyup #login-password":        "loginKeyPress",
            "click #login-button":          "loginButtonClick"
        },

        initialize: function() {
            console.log("loginLayout - initialize");
            this.loginModel = new LoginModel();
        },

        onClose: function() {
            console.log("loginLayout - onShow");
        },

        onRender: function() {
            this.delegateEvents();
        },

        onShow: function() {
            console.log("loginLayout - onShow");

            // debounce the login buttons
            this.loginButtonClick = _.debounce(this.loginButtonClick, 1000, true);
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
            console.log("loginLayout - loginButtonClick");

            AppUser.userLogin(this.loginModel.toJSON());
        }
    });
});