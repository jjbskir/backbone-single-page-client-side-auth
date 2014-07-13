// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'router', // Request router.js
], function($, _, Backbone, Router){

    Backbone.View.prototype._views = {};

    Backbone.View.prototype._models = [];

    /**
     * Add a on_close method to all of the views.
     * Allows the view to be able to chain on_close's.s
     */
    Backbone.View.prototype.on_close = function() {
        // unbind all of the model events.
        _.each(this._models, function(model) { 
            model.unbind();
        });
        // causing heap memeory leak errors. Seems to be recusively doing somthing wrong.
        // close all of the children views correctly.
        // _.each(this.views, function(view) { 
        //     view.on_close();
        // });
        // unbind the view events.
        this.unbind();
        // remove the view template from the screen.
        $(this.template).remove();
        // should this be used to?
        //this.remove();
    }

    var initialize = function(){
        // Pass in our Router module and call it's initialize function
        Router.init();
    };

  return { 
    initialize: initialize
  };
});