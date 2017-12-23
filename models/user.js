var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var LoginUser = new Schema({
    name: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    role: String
});

LoginUser.methods.getName = function() {
    return (this.name);
};

LoginUser.plugin(passportLocalMongoose);

module.exports = mongoose.model('LoginUser', LoginUser);