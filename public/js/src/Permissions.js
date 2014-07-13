 define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

 	// permissions of users and routes.
    var permissions = {
    	// default permission
        public: 1,
        user: 2,
        admin: 4,
        // mapping of the route to it's permission to view it.
        routes_permissions: {},
        // default is public.
        user_permission: 1,

        init: function(routes, route_permissions) {
        	// set the route permissions
        	this.set_route_permissions(routes, route_permissions);
        },

        set_route_permissions: function(routes, route_permissions) {
        	var that = this;
        	_.each(routes, function(route_func, route) {
        		if (route.indexOf('/') !== -1) route = route.substring(0, route.indexOf('/'));
        		// if the route is not defined in the permissions, then give the route a user permission. 
        		if (!_.has(route_permissions, route)) {
        			route_permissions[route] = permissions.user;
        		}
        	});
       		this.routes_permissions = route_permissions;
        },

        validate: function(route, user_permission) {
        	// remove everything after the /.
        	if (route.indexOf('/') !== -1) route = route.substring(0, route.indexOf('/'));
        	// if the route we are validating does not have a set permission, just return false.
        	if (!_.has(this.routes_permissions, route)) return false;
        	// if the user permissions are greater then or equal then let the boss in.
        	return (user_permission >= this.routes_permissions[route]);
        }
    }

    return permissions;

});