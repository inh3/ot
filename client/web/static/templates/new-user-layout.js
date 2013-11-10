define(['handlebars'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["new-user-layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"panel-heading\">Sign Up for OpenTweet!</div>\n<div class=\"panel-body\">\n    <form class=\"form-horizontal\" role=\"form\">\n        <div class=\"form-group\">\n            <label for=\"sign-up-user-name\" class=\"col-sm-2 control-label\">User Name</label>\n            <div class=\"col-sm-8\">\n                <input type=\"text\" class=\"form-control\" id=\"sign-up-user-name\" placeholder=\"User Name\">\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"sign-up-password\" class=\"col-sm-2 control-label\">Password</label>\n            <div class=\"col-sm-8\">\n                <input type=\"password\" class=\"form-control\" id=\"sign-up-password\" placeholder=\"Password\">\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"sign-up-email\" class=\"col-sm-2 control-label\">E-Mail</label>\n            <div class=\"col-sm-8\">\n                <input type=\"text\" class=\"form-control\" id=\"sign-up-email\" placeholder=\"E-Mail\">\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"sign-up-sound-byte\" class=\"col-sm-2 control-label\">Sound Byte</label>\n            <div class=\"col-sm-8\">\n                <input type=\"text\" class=\"form-control\" id=\"sign-up-sound-byte\" placeholder=\"Sound Byte\">\n            </div>\n        </div>\n        <div class=\"form-group bottom\">\n            <div class=\"col-sm-offset-2 col-sm-6\">\n                <button id=\"sign-up-button\" type=\"button\" class=\"btn btn-default\" disabled>Sign Up</button>\n                <p class=\"text-danger error-text hidden\">Try a different username.</p>\n            </div>\n        </div>\n    </form>\n</div>";
  });

return this["Handlebars"]["templates"];

});