// Token model. For saving users in a Cookie.

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

// define the schema for our user model
var token_schema  = Schema({
    // the cookie token.
    token: String,
    // user id that is saved against the row's cookie id. 
    userId: String

});

// create the model for token and expose it to our app
module.exports = mongoose.model('Token', token_schema);