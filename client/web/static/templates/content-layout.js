define(['handlebars'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["content-layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header>\n    <h2 id=\"content-title\">Content Title</h2>\n</header>\n<div class=\"content-section\">\n    <form method=\"post\"><p>Check to <label>\n        <input type=\"checkbox\" name=\"remember\"/> remember me</label>\n        <input type=\"submit\" value=\"Submit\"/>.</p></form>\n</div>";
  });

return this["Handlebars"]["templates"];

});