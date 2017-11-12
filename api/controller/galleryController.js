/*
GET     /galleries              - returns the list of all galleries
Post    /galleries              - creates a new gallery with description

GET     /gallery/{:id}          - returns all images of the gallery with the given id,
POST    /gallery/{:id}          - creates a new image of the gallery
PUT     /gallery/{:id}          - updates a gallery by id
DELETE  /gallery/{:id}          - removes a gallery by id

GET     /images                 - returns the list of all images
POST    /images                 - creates a new image with data specified

GET     /image/{:id}            - returns a image with given id
PUT     /image/{:id}            - update a image by id
DELETE  /image/{:id}            - remove a image by id

GET     /artists                - returns the list of all artists
POST    /artists                - create a new artist

GET     /artist/{:id}           - returns an artist with given id
GET     /artist/{:id}/images    - return all images of the artist
PUT     /artist/{:id}           - updates an artist by id
DELETE  /artist/{:id}           - removes an artist
https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-303078.jpg
https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-585842.jpg
https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-586355.jpg
*/

var mongoose    = require('mongoose');
var model       = require('../models/galleryModel');
var Gallery     = model.gallery,
    Photo       = model.photo,
    Artist      = model.artist;

listAllGalleries = (res) => {
    Gallery.find({}, (err, galleries) => {
        if (err) res.send(err);
        res.json(galleries);
    })
}

listAllArtists = (res) => {
    Artist.find({}, (err, artists) => {
        if (err) res.send(err);
        res.json(artists);
    })
}
listPhoto = (gallery_id, res) => {

}

// POST /galleries
exports.createGallery = (req, res) => {
    var gallery = new Gallery(req.body);
    gallery.save()
        .then(() => {
            listAllGalleries(res);
        });
};

// GET /galleries
exports.listGalleries = (req, res) => {
    listAllGalleries(res);
};

// PUT /galleries/:gallery_id
exports.editGallery = (req, res) => {
    Gallery.findByIdAndUpdate(req.params.gallery_id, { $set: req.body }).exec()
        .then(() => {
            listAllGalleries(res);
        });
};

// DELETE /galleries/:gallery_id
exports.deleteGallery = (req, res) => {
    Gallery.findByIdAndRemove(req.params.gallery_id).exec()
        .then(() => {
            listAllGalleries(res);
        });
}

// POST /galleries/:gallery_id
exports.createPhoto = (req, res) => {
    var newPhoto = new Photo(req.body);
    Artist.update({_id: newPhoto.artist_id}, { $push: { photos: newPhoto._id }}).exec();

    newPhoto.save().then(photo => {
        Gallery.findByIdAndUpdate(
            req.params.gallery_id,
            { $push: { photos: newPhoto._id }},
            { "new": true, "safe": true }
        )
        .populate({
            "path": "photos",
            "populate": {
                "path": "artist_id"
            }
        })
        .exec((err, gallery) => {
            if (err) res.send(err);
            res.json(gallery);
        });
    });
};

// GET /galleries/:gallery_id
exports.listPhotos = (req, res) => {
    Gallery
        .findById(req.params.gallery_id)
        .populate('photos')
        .exec((err, gallery) =>{
            if (err) res.send(err);
            res.json(gallery);
        });
};


// PUT /galleries/:gallery_id/:photo_id
exports.updatePhoto = (req, res) => {
    var photo_id = req.params.photo_id;
    Gallery
        .findById(req.params.gallery_id)
        .populate('photos.artist')
        .exec((err, gallery) => {
            res.json(gallery)
        })

}

// POST /artists
exports.createArtist = (req, res) => {
    var artist = new Artist(req.body);
    artist.save()
    .then(() => {
        listAllArtists(res);
    });
};

// GET /artists
exports.listArtists = (req, res) => {
    listAllArtists(res);
};

// PUT /artists/:artist_id
exports.editArtist = (req, res) => {
    Artist.findByIdAndUpdate(req.params.artist_id, { $set: req.body }).exec()
    .then(() => {
        listAllArtists(res);
    });
}