// Author: Jeremy
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
    paths: {
        jquery: 'libs/jquery.min',
        jqueryui: 'libs/jquery-ui-1.10.4.custom.min',
        validation: 'libs/jquery.validate.min',
        validation_addition: 'libs/validation-additional-methods.min',
        jquery_cookie: 'libs/jquery.cookie',
        bootstrap: 'libs/bootstrap.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-optamd3-min',
        backbone_router: 'libs/backbone.routefilter',
        text: 'libs/text',
        templates: '../templates'
    },
    shim: {
        'jqueryui': ['jquery'],
        'bootstrap': ['jquery'],
        'validation': ['jquery'],
        'validation_addition': ['jquery', 'jquery.validate.min'],
        'jquery_cookie': ['jquery'],
        'backbone_router': ['jquery', 'underscore', 'backbone']
    }

});

require([
  	// Load our app module and pass it to our definition function
  	'jquery', 'underscore', 'app', 'bootstrap'
], function($, _, App){
 	// The "app" dependency is passed in as "App"
  	// Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  	App.initialize();
});