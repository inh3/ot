define(['handlebars'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["user-layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"user-layout-header\"></div>\n<div id=\"user-layout-content\"></div>";
  });

return this["Handlebars"]["templates"];

});