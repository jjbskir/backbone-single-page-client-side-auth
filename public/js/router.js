// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'src/Page',
    'src/Permissions',
    'views/DefaultView',
    'views/HeaderView',
    'views/user_account/LoginPageView',
    'views/user_account/SignupPageView',
    'models/Session',
    'backbone_router'
], function($, _, Backbone, Page, Permissions, DefaultView, HeaderView, LoginPageView, SignupPageView, Session) {

    var AppRouter = Backbone.Router.extend({
        // define the route and function maps for this router
        routes: {
            "": "public",
            "user": "user",
            "admin": "admin",
            "login": "login",
            "signup": "signup"
        },

        // by default all routes are user protected.
        route_permissions: {
            "": Permissions.public,
            "admin": Permissions.admin,       
            "login": Permissions.public,
            "signup": Permissions.public
        },

        /**
         * Used to initate the router in app.js
         */
        init: function() {},

        /**
         * Before every url change, authenticate the routes.
         */
        before: function(route) {
            // dependent on what auth returns.
            return this.auth();
        },

        /**
         * Make sure that the user can has the permissions to view the route.
         */
        auth: function() {
            var route = Backbone.history.fragment;
            // if the user is permitted to view the route. 
            var user = Session.get('user');
            var permission = user.permission;
            // TODO: figure out why the model Session and the user variable will be different when logged.
            // console.log(Session);
            // console.log(user);
            if (!Permissions.validate(route, permission) && permission != Permissions.user) {
                this.navigate('login', {trigger: true});
                // returning false will prevent the original routing. 
                return false;           
            }
            // if you are allready logged in but not allowed to view. For admin areas.
            else if (!Permissions.validate(route, permission) && permission == Permissions.user) {
                this.navigate('', {trigger: true});
                return false;           
            }
            // else direct them to another area.
            return true;  
        },

        /**
         * When ever the session authentication changes, check to see if they have logged in or out.
         */
        session_change: function() {
            var route = Backbone.history.fragment;
            // if the user has just logged in.
            if (route != '' && Session.previous('auth') == false && Session.get('auth') == true) {
                // redirect to homepage
                // best to make this a public page, in case it takes a second or 2 to update the model for some odd reason.
                this.navigate('', {trigger: true});
                return false;
            }
            // the user has just loggeed out.
            else if (Session.get('auth') == false) {
                // redirect to login page.
                this.navigate('login', {trigger: true});
                return false;
            }
            return true;
        },

        initialize: function() {
            Permissions.init(this.routes, this.route_permissions);
            var header = new HeaderView({el: $("#header"), template_name: 'header'});
            header.render();
            var footer = new DefaultView({el: $("#footer"), template_name: 'footer'});
            footer.render();

            // the real router initialization occurs in this callback, after the session has begun.
            Session.getAuth(function() {
                Backbone.history.start();
                Session.bind('change:auth', app_router.session_change, app_router);
            });

        },

        public: function(data) {
            $('#main').html('Any one can see.');
        },

        user: function() {
            $('#main').html('Need to be logged in to see.');
        },

        admin: function() {
            $('#main').html('Need to be a admin to see.');
        },

        login: function(data) {
            Page.show(new LoginPageView({el: $('#main')}));
        },

        signup: function(data) {
            Page.show(new SignupPageView({el: $('#main')}));
        }

    });

    var app_router = new AppRouter(); 
    return app_router;

});





