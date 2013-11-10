define([    "layouts/loginLayout",
            "layouts/newUserLayout",
            "vent",
            "handlebars",
            "templates/landing-page-layout",
            "marionette"],
function(   LoginLayout,
            SignUpLayout,
            EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        template: Handlebars.templates["landing-page-layout.hbs"],

        regions: {
            loginRegion: "#login-region",
            signUpRegion: "#sign-up-region"
        },

        initialize: function() {
            this.loginLayout = new LoginLayout();
            this.signUpLayout = new SignUpLayout();
        },

        onRender: function() {
        },

        onShow: function() {
            this.loginRegion.show(this.loginLayout);
            this.signUpRegion.show(this.signUpLayout);
        }
    });
});