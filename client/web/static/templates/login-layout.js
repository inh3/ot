define(['handlebars'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["login-layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"panel-heading\">Login to OpenTweet!</div>\n<div class=\"panel-body\">\n    <form class=\"form-horizontal\" role=\"form\">\n        <div class=\"form-group\">\n            <label for=\"login-user-name\" class=\"col-sm-2 control-label\">Email</label>\n            <div class=\"col-sm-8\">\n                <input type=\"text\" class=\"form-control\" id=\"login-user-name\" placeholder=\"User Name\">\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"login-password\" class=\"col-sm-2 control-label\">Password</label>\n            <div class=\"col-sm-8\">\n                <input type=\"password\" class=\"form-control\" id=\"login-password\" placeholder=\"Password\">\n            </div>\n        </div>\n        <div class=\"form-group bottom\">\n            <div class=\"col-sm-offset-2 col-sm-6\">\n                <button id=\"login-button\" type=\"button\" class=\"btn btn-default\">Log In</button>\n            </div>\n        </div>\n    </form>\n</div>";
  });

return this["Handlebars"]["templates"];

});