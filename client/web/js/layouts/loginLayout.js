define([    "models/loginModel",
            "models/signUpModel",
            "models/userModel",
            "vent",
            "underscore",
            "handlebars",
            "templates/login-layout",
            "marionette"],
function(   LoginModel,
            SignUpModel,
            UserModel,
            EventAggregator,
            _,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        el: '#content',

        template: Handlebars.templates["login-layout.hbs"],

        ui: {
            userNameLogin:      "#username-login",
            passwordLogin:      "#password-login",
            loginButton:        "#login-button",

            userNameSignUp:     "#username-sign-up",
            passwordSignUp:     "#password-sign-up",
            emailSignUp:        "#email-sign-up",
            soundByteSignUp:    "#sound-byte-sign-up",
            signUpButton:       "#sign-up-button"
        },

        events: {
            "keyup #username-login":        "loginKeyPress",
            "keyup #password-login":        "loginKeyPress",
            "click #login-button":          "loginButtonClick",

            "keyup #username-sign-up":      "signUpKeyPress",
            "keyup #password-sign-up":      "signUpKeyPress",
            "keyup #email-sign-up":         "signUpKeyPress",
            "keyup #sound-byte-sign-up":    "signUpKeyPress",
            "click #sign-up-button":        "signUpButtonClick"
        },

        initialize: function() {
            console.log("loginLayout - initialize");
            this.loginModel = new LoginModel();
            this.signUpModel = new SignUpModel();

            // debounce the login buttons
            this.loginButtonClick = _.debounce(this.loginButtonClick, 1000, true);
            this.signUpButtonClick = _.debounce(this.loginButtonClick, 1000, true);
        },

        onRender: function() {
            this.$el.addClass('sign-up');
            this.$el.removeClass('hidden');
        },

        onShow: function() {
            console.log("loginLayout - onShow");
        },

        loginKeyPress: function(event) {
            this.loginModel.set({ "userName": this.ui.userNameLogin.val().trim() });
            this.loginModel.set({ "password": this.ui.passwordLogin.val().trim() });
            this.loginModel.isValid() ? this.ui.loginButton.removeAttr("disabled") : this.ui.loginButton.attr("disabled", '');

            // enter has been pressed
            if (event.which == 13 || event.keyCode == 13) {
                if(this.loginModel.isValid()) {
                    UserModel.userLogin(this.loginModel.toJSON());
                }
            }
        },
        loginButtonClick: function() {
            console.log("loginLayout - loginButtonClick");

            UserModel.userLogin(this.loginModel.toJSON());
        },

        signUpKeyPress: function() {
            this.signUpModel.set({ "userName": this.ui.userNameSignUp.val().trim() });
            this.signUpModel.set({ "password": this.ui.passwordSignUp.val().trim() });
            this.signUpModel.set({ "email": this.ui.emailSignUp.val().trim() });
            this.signUpModel.set({ "soundByte": this.ui.soundByteSignUp.val().trim() });
            this.signUpModel.isValid() ? this.ui.signUpButton.removeAttr("disabled") : this.ui.signUpButton.attr("disabled", '');
        },
        signUpButtonClick: function() {
            console.log("loginLayout - signUpButtonClick");
        }
    });
});