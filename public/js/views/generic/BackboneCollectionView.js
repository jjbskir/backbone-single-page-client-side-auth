/**
 * BackboneCollectionView View.
 * Generic view for adding a collection to a screen. 
 */
define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){

    var BackboneCollectionView = Backbone.View.extend({

        /** 
         * Add all items in the colleciton at once.
         * collections: Collection of models we are iterating through.
         * params: Parameters we may want to pass to the model when creating it's view.
         */
        add_all: function(collection, params) {
            // go through all the models in a collection.
            for (var i = 0; i < collection.length; i++) {
                var model = collection.models[i];
                // add each model to the view.
                this.add_one(model, null, params);
            }
        },

        /** 
         * Add a single model to the list by creating a view for it.
         * model: Model we are adding to a div.
         * event: Event that lead to adding a new view. If added through this.add_one, then probably null. 
         *    But if added through a jquery binding event, then there will be a proper event object.
         * params: Parameters that are to be used to create the new view.
         *    {view: Backbone View Class, container: Container to append the new view into, class: Class to give the new div for the view}
         */
        add_one: function(model, event, params) {
            // need to at least provide the view to add.
            if (!params) return;
            // create a new div to add the new view to.
            var div_params = {};
            if (_.has(params, 'class')) div_params['class'] = params.class;
            div_params['data-id'] = model.id
            var new_div = $("<div>", div_params);
            params.container.append(new_div);
            // add the view.
            var view = new params.view({model: model, el: new_div});
            this._views[model.id] = view;
            view.render();
        },

        /**
         * Remove a view.
         */
        remove_one: function(model) {
            // hide the view
            var view = this._views[model.id];
            view.remove();
            // delete it from the list.
            delete this._views[model.id];
        }


    });

    return BackboneCollectionView;

});