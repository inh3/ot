define(['handlebars'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["sidebar-nav-layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<nav>\n    <h4 id=\"logo\">Navigation</h4>\n    <ul>\n        <li><a href=\"#whatAndWhy\">What &amp; Why</a></li>\n        <li><a href=\"#grid\">Grid</a></li>\n        <li><a href=\"#typography\">Typography</a></li>\n        <li><a href=\"#buttons\">Buttons</a></li>\n        <li><a href=\"#forms\">Forms</a></li>\n        <li><a href=\"#mediaQueries\">Media Queries</a></li>\n        <li><a href=\"#support\">Support</a></li>\n        <li><a href=\"#examples\">Examples</a></li>\n        <li><a href=\"#download\">Download</a></li>\n        <li><a href=\"#licenseandlog\">License &amp; Log</a></li>\n    </ul>\n</nav>\n&nbsp;";
  });

return this["Handlebars"]["templates"];

});