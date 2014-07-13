/**
 * Page view.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'views/user_account/SignupView',
  'text!templates/user_account/page.html',
  'jqueryui',
], function($, _, Backbone, SignUpView, view_template){

  var PageView = Backbone.View.extend({

      initialize: function() {
      },

      render: function() {
          var template_options = {};
          this.template = _.template(view_template, template_options);
          var new_view = this.el.html(this.template);

          var login_view = new SignUpView({el: $('#user_account')});
          login_view.render();    

          return new_view;
      },

  });

  return PageView;

});

