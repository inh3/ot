define(['handlebars'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["navigation-bar-layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"navbar-header\">\n    <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse-element\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n    </button>\n    <a class=\"navbar-brand\" href=\"#\">Open Tweet</a>\n</div>\n\n<div class=\"collapse navbar-collapse\" id=\"navbar-collapse-element\">\n    <form class=\"navbar-form navbar-left\" role=\"search\">\n        <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Search for User\">\n        </div>\n    </form>\n</div>";
  });

return this["Handlebars"]["templates"];

});