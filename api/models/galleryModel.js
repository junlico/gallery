var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;


var GallerySchema = new Schema({
    name:           {type: String, required: true},
    description:    String,
    photos:         [{type: Schema.Types.ObjectId, ref: 'Photo'}]
});

var PhotoSchema = new Schema({
    title:          {type: String, required: true},
    original:       {type: String, required: true},
    thumbnail:      String,
    artist_id:      {type: Schema.Types.ObjectId, ref: 'Artist', required: true},
    year:           Number,
    type:           String,
    width:          Number,
    height:         Number,
    location:       String,
    description:    String
});

var ArtistSchema = new Schema({
    name:           {type: String, required: true},
    birth_year:     Number,
    country:        String,
    description:    String,
    photos:         [{type: Schema.Types.ObjectId, ref: 'Photo'}]
});

module.exports.gallery  = mongoose.model('Gallery', GallerySchema);
module.exports.photo    = mongoose.model('Photo', PhotoSchema);
module.exports.artist   = mongoose.model('Artist', ArtistSchema);