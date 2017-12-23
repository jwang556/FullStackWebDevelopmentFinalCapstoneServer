// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var favoriteSchema = new Schema({
    postedBy: {
        required: true
        ,type: mongoose.Schema.Types.ObjectId
        ,ref: 'User'
    }
    , dishes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' } ] 
}
,{
    timestamps : true
 }                           
); 

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;

