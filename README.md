backbone-single-page-client-side-auth
========================

One way to implement authentication/authorization in single page Backbone application, with node.js/express on the server.

To run the server locally, open a terminal, and navigate to the directory you cloned the project to. Make sure you have Node/NPM installed! Then run the following commands:

```
npm install
npm start
```

Live Demo
------------

| Platform                       			| Username | Password |
| ----------------------------------------- | -------- | -------- |
| http://morning-tundra-8603.herokuapp.com/ | jjbskir  | password |

Technology
------------

| On The Server 			| On The Client  		| 
| ------------- 			| -------------- 		|
| Express       			| Bootstrap      		|        
| Mongoose      			| Backbone.js    		|        
| Passport      			| jQuery         		|             
| passport-remember-me      | Underscore.js  		|             
| connect-mongo				| backbone.routefilter  |             
|        					| jqueryvalidation  	|             

Features
------------
 - Authentication in single page 
 - Login user 
 - Persistent login with cookies
 - Sighnup
 - Logout
 - User roles - public, user, admin
 - Determinig which routes are viewable based on the user's role
 - Basic web forms 
 
 Todo
------------
 - Login with Facebook
 - Email verification 
 - Password recovery 
 - User account area

Influences
------------
 - https://github.com/fnakstad/angular-client-side-auth
 - https://github.com/jedireza/drywall
 - http://fishbowl.pastiche.org/2004/01/19/persistent_login_cookie_best_practice/

## License
```
The MIT License (MIT)

Copyright (c) 2013 Frederik Nakstad

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```