define(['handlebars'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["user-tweets-composite-view.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"panel-heading\">";
  if (stack1 = helpers.user_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.user_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " Tweets</div>\n<!--<div class=\"panel-body\"></div>-->\n<ul class=\"list-group\"></ul>";
  return buffer;
  });

return this["Handlebars"]["templates"];

});