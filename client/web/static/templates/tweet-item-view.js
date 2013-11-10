define(['handlebars'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["tweet-item-view.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"media\">\n    <div class=\"pull-right\">\n        <div class=\"media-object\">";
  if (stack1 = helpers.timestamp) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.timestamp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n    </div>\n    <div class=\"media-body\">\n        <a href=\"#!/";
  if (stack1 = helpers.user_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.user_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><strong>";
  if (stack1 = helpers.user_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.user_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong></a>\n        ";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    </div>\n</div>";
  return buffer;
  });

return this["Handlebars"]["templates"];

});