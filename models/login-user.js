var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var LoginUser = new Schema({
    username: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    role: String
});

LoginUser.methods.getName = function() {
    return (this.username);
};

LoginUser.plugin(passportLocalMongoose);

module.exports = mongoose.model('LoginUser', LoginUser);