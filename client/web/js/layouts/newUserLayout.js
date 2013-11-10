define([    "models/signUpModel",
            "appUser",
            "vent",
            "underscore",
            "handlebars",
            "templates/new-user-layout",
            "marionette"],
function(   SignUpModel,
            AppUser,
            EventAggregator,
            _,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        tagName: "div",
        className: "panel panel-default",

        template: Handlebars.templates["new-user-layout.hbs"],

        ui: {
            userNameSignUp:     "#sign-up-user-name",
            passwordSignUp:     "#sign-up-password",
            emailSignUp:        "#sign-up-email",
            soundByteSignUp:    "#sign-up-sound-byte",
            signUpButton:       "#sign-up-button",

            errorText:          ".error-text"
        },

        events: {
            "keyup #sign-up-user-name":         "signUpKeyPress",
            "keyup #sign-up-password":          "signUpKeyPress",
            "keyup #sign-up-email":             "signUpKeyPress",
            "keyup #sign-up-sound-byte":        "signUpKeyPress",
            "click #sign-up-button":            "signUpButtonClick"
        },

        initialize: function() {
            console.log("newUserLayout - initialize");
            this.signUpModel = new SignUpModel();

            // debounce the login buttons
            this.signUpButtonClick = _.debounce(this.signUpButtonClick, 1000, true);

            // add user complete event
            this.listenTo(EventAggregator, "user:add:complete", this.signUpFailed);
        },

        onRender: function() {
            this.delegateEvents();
        },

        signUpKeyPress: function(event) {
            this.signUpModel.set({ "userName": this.ui.userNameSignUp.val().trim() });
            this.signUpModel.set({ "password": this.ui.passwordSignUp.val().trim() });
            this.signUpModel.set({ "email": this.ui.emailSignUp.val().trim() });
            this.signUpModel.set({ "soundByte": this.ui.soundByteSignUp.val().trim() });
            this.signUpModel.isValid() ? this.ui.signUpButton.removeAttr("disabled") : this.ui.signUpButton.attr("disabled", '');

            // enter has been pressed
            if (event.which == 13 || event.keyCode == 13) {
                if(this.signUpModel.isValid()) {
                    this.signUpButtonClick();
                }
            }
        },

        signUpButtonClick: function() {
            AppUser.addUser(this.signUpModel.toJSON());
        },

        signUpFailed: function(signUpSuccess) {
            if(signUpSuccess === false) {
                this.ui.errorText.removeClass('hidden');
            }
            else {
                this.ui.errorText.addClass('hidden');
            }
        }
    });
});