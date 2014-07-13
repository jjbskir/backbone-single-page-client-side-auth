 define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

 	/**
 	 * Event dispatcher.
 	 */
    var Vent = _.extend({}, Backbone.Events);
    return Vent;

});