// User model.

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    bcrypt      = require('bcrypt-nodejs');

// define the schema for our user model
var user_schema  = Schema({

    local           : {
        email       : String,
        password    : String,
        username    : String
    },
    facebook        : {
        id          : String,
        token       : String,
        email       : String,
        name        : String
    },
    twitter         : {
        id          : String,
        token       : String,
        displayName : String,
        username    : String
    },
    google          : {
        id          : String,
        token       : String,
        email       : String,
        name        : String
    },
    created     : {type: Date, default: Date.now},
    // set the default permission to 2 for users. 1 is public and 4 is admin.
    permission  :  {type: Number, default: 2}
    //favorites   : [{ type : Schema.ObjectId, ref : 'Combo' }]
});

// generating a hash
user_schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user_schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', user_schema);