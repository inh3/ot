define([    "backbone"],
function(   Backbone) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            "userName":     "",
            "password":     ""
        },

        validate: function(attributes, options) {
            return !(attributes.userName.length > 0 && attributes.password.length > 0);
        }
    });
});