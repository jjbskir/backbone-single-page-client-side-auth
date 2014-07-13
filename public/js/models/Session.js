// views/app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'src/Permissions'
], function($, _, Backbone, Permissions) {

  var SessionModel = Backbone.Model.extend({
  
    urlRoot: '/session',

    defaults: {
      _csrf: '',
      auth: '',
      user: {
        permission: Permissions.public
      }
    },

    initialize: function () {
      var that = this;
      // Hook into jquery
      // Use withCredentials to send the server cookies
      // The server must allow this through response headers
      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.xhrFields = {
          withCredentials: true
        };
        // If we have a csrf token send it through with the next request
        if(typeof that.get('_csrf') !== 'undefined') {
          jqXHR.setRequestHeader('X-CSRF-Token', that.get('_csrf'));
        }
      });
    },

    login: function(user, error_msg) {
      // Do a POST to /session and send the serialized form creds
      // {username: local.username, password: local.password}
      // jjbskir, password
      var creds =  {username: user.username, password: user.password, remember_me: user.remember_me};
      this.save(creds, {
         success: function () {},
         error: error_msg
      });
    },

    signup: function(user, error_msg) {
      // attempt to signup a new user.
      // if the username or password was not provided.
      var creds =  {username: user.username, password: user.password, remember_me: user.remember_me};
      var that = this;
      var login = $.post( "/signup", creds, function(user) {
          that.set(user);
      });
      login.fail(error_msg);
    },
    
    logout: function() {
      // Do a DELETE to /session and clear the clientside data
      var that = this;
      this.destroy({
        success: function (model, resp) {
          that.id = null;
          // Set auth to false to trigger a change:auth event
          // The server also returns a new csrf token so that
          // the user can relogin without refreshing the page
          that.set({auth: false, _csrf: resp._csrf, user: {permission: Permissions.public} });
        }
      });      
    },

    getAuth: function(callback) {
      var that = this;
      // getAuth is wrapped around our router
      // before we start any routers let us see if the user is valid
      this.fetch({
          success: function(model, resp) {
            callback();
          }
      });
    }
  });
  return new SessionModel();

});