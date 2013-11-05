define(['handlebars'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["login-layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h2>Welcome to OpenTweet!</h2>\n\n<div class=\"row\">\n    <div class=\"six columns alpha\">\n        <span>Login if you've already joined!</span>\n        <br>\n\n        <label for=\"regularInput\">Username</label>\n        <input type=\"text\" id=\"username-login\"/>\n\n        <!-- Label and text input -->\n        <label for=\"regularInput\">Password</label>\n        <input type=\"password\" id=\"password-login\"/>\n\n        <button type=\"submit\" id=\"login-button\" disabled>Login</button>\n    </div>\n\n    <div id=\"sign-up-div\" class=\"six columns omega\">\n        <span>Sign up if you are new!</span>\n        <br>\n\n        <label for=\"regularInput\">Username</label>\n        <input type=\"text\" id=\"username-sign-up\"/>\n\n        <!-- Label and text input -->\n        <label for=\"regularInput\">Password</label>\n        <input type=\"password\" id=\"password-sign-up\"/>\n\n        <label for=\"regularInput\">E-Mail</label>\n        <input type=\"text\" id=\"email-sign-up\"/>\n\n        <label for=\"regularInput\">Sound Byte</label>\n        <input type=\"text\" id=\"sound-byte-sign-up\"/>\n\n        <button type=\"submit\" id=\"sign-up-button\" disabled>Sign Up for OpenTweet</button>\n    </div>\n</div>";
  });

return this["Handlebars"]["templates"];

});