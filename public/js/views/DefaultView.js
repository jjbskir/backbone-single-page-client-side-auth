/**
 * Default view.
 */

define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){

  var DefaultView = Backbone.View.extend({

      initialize: function() {
          // template name.
          this.template_name = this.options.template_name;
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

  });

  return DefaultView;

});
