/**
 * Question Page view.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'views/DefaultView',
  'text!templates/question/app_template.html',
  'jqueryui',
], function($, _, Backbone, DefaultView, view_template){

  var AppView = Backbone.View.extend({

      views: {},
      models: [],

      initialize: function() {
          this.page_view = this.options.page_view;
      },

      render: function() {
          var template_options = {};
          this.template = _.template(view_template, template_options);
          this.el.html(this.template);

          this.page_view.render();     

          var header = new DefaultView({el: $("#header"), template_name: 'header'});
          header.render();
          var footer = new DefaultView({el: $("#footer"), template_name: 'footer'});
          footer.render();
          
      },

  });

  return AppView;

});
