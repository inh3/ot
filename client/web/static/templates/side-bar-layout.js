define(['handlebars'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["side-bar-layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n<div id=\"tweet-entry\" class=\"list-group-item\">\n    <textarea id=\"tweet-text\" class=\"form-control\" rows=\"7\" maxlength=\"140\"/>\n    <div>\n        <div class=\"vertical-align\">\n            <button id=\"tweet-button\" type=\"button\" class=\"btn btn-default\" disabled=\"disabled\">Tweet</button>\n        </div>\n        <div class=\"vertical-align tweet-char-count\">\n            <span id=\"tweet-characters\">0 / 140</span>\n        </div>\n    </div>\n</div>\n";
  }

  buffer += "<a id=\"user-tweets-item\" href=\"#!/";
  if (stack1 = helpers.user_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.user_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/tweets\" class=\"list-group-item\">\n    <span class=\"badge\">";
  if (stack1 = helpers.num_tweets) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.num_tweets; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    Tweets\n</a>\n<a id=\"user-followers-item\" href=\"#!/";
  if (stack1 = helpers.user_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.user_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/followers\" class=\"list-group-item\">\n    <span class=\"badge\">";
  if (stack1 = helpers.num_followers) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.num_followers; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    Followers\n</a>\n<a id=\"user-following-item\" href=\"#!/";
  if (stack1 = helpers.user_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.user_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/following\" class=\"list-group-item\">\n    <span class=\"badge\">";
  if (stack1 = helpers.num_follows) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.num_follows; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    Following\n</a>\n";
  stack1 = helpers['if'].call(depth0, depth0.showTweetText, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

return this["Handlebars"]["templates"];

});