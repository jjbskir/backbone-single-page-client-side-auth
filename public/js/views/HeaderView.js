/**
 * Default view.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'models/Session',
  'text!templates/website/header_login.html',
  'text!templates/website/header_logout.html',
], function($, _, Backbone, Session, header_login, header_logout){

  var DefaultView = Backbone.View.extend({

      initialize: function() {
          // template name.
          this.template_name = this.options.template_name;
          Session.bind('change:auth', this.check_login, this);
      },

      render: function() {
          this.template_path = 'text!templates/website/' + this.template_name + '.html';
          // used to pass object conext to the require callback.
          var that = this;
          require([this.template_path], function(template_path) {
              var template_options = {}
              // Compile the template using underscore
              that.template = _.template(template_path, template_options);
              that.el.html(that.template);
          });

      },

      check_login: function() {
          // if the user is logged in then change the header to not have the login area.
          // switch to logout.
          var user_header = $(this.el).find('#user_actions');
          // if the user is logged in
          var template;
          if (Session.get('auth')) {
              template = _.template(header_logout);
          }
          // if the user is not logged in.
          else {
              template = _.template(header_login);
          }
          user_header.html(template);
      },

      events: {
          'click .logout': 'click_logout'
      },

      click_logout: function() {
          Session.logout();
      }

  });

  return DefaultView;

});
