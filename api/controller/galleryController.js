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


listAllPhotos = (id, res, view='galleryView') => {
    if (view === 'galleryView') {
        Gallery
            .findById(id)
            .populate({
                "path": "photos",
                "populate": {
                    "path": "artist_id"
                }
            }).exec((err, gallery) =>{
                if (err) res.send(err);
                res.json(gallery);
            });
    } else if (view === 'artistView') {
        Artist
            .findById(id)
            .populate('photos')
            .exec((err, artist) => {
                if (err) res.send(err);
                res.json(artist);
            });
    }
};


// POST /galleries
// Create a new gallery, return an updated list of all galleries
exports.createGallery = (req, res) => {
    var gallery = new Gallery(req.body);
    gallery.save()
        .then(() => {
            this.listGalleries(0, res);
        });
};


// GET /galleries
// Return a list of all galleries
exports.listGalleries = (req, res) => {
    Gallery.find({}, (err, galleries) => {
        if (err) res.send(err);
        res.json(galleries);
    })
};


// PUT /galleries/:gallery_id
// Edit a gallery with given gallery_id, return an updated list of all galleries
exports.editGallery = (req, res) => {
    Gallery.findByIdAndUpdate(req.params.gallery_id, { $set: req.body }).exec()
        .then(() => {
            this.listGalleries(0, res);
        });
};


// DELETE /galleries/:gallery_id
// Delete a gallery with given gallery_id, return an updated list of all galleries
exports.deleteGallery = (req, res) => {
    Gallery.findByIdAndRemove(req.params.gallery_id).exec()
        .then(() => {
            this.listGalleries(0, res);
        });
}


// POST /galleries/:gallery_id
// Create a new photo in the gallery with given gallery_id, update Gallery and Artist with newPhoto._id
// Return an updated list of all photos in the gallery
exports.createPhoto = (req, res) => {
    var newPhoto = new Photo(req.body);
    newPhoto.set('thumbnail', req.body.original);
    newPhoto.save().then((photo) => {
        Artist.update({_id: photo.artist_id}, { $push: { photos: photo._id }}).exec();
    }).then(() => {
        Gallery.findByIdAndUpdate(
            req.params.gallery_id,
            { $push: { photos: newPhoto._id }},
            { "new": true, "safe": true }
        ).populate({
            "path": "photos",
            "populate": {
                "path": "artist_id"
            }
        }).exec((err, gallery) => {
            if (err) res.send(err);
            res.json(gallery);
        });
    });
};


// GET /galleries/:gallery_id
// Return a list of all photos of the gallery
exports.galleryView = (req, res) => {
    listAllPhotos(req.params.gallery_id, res);
};


// PUT /galleries/:gallery_id/:photo_id
// Edit the photo with given photo_id, return an updated list of all photos in the gallery
exports.updatePhoto = (req, res) => {
    var editInfo = req.body;
    if (editInfo.original) {
        editInfo['thumbnail'] = editInfo.original;
    }

    Photo.findByIdAndUpdate(req.params.photo_id, { $set: editInfo }).exec()
        .then(() => {
            listAllPhotos(req.params.gallery_id, res);
        });
};


// DELETE /galleries/:gallery_id/:photo_id
// Delete the photo with given photo_id, return an updated list of all photos in the gallery
exports.deletePhoto = (req, res) => {
    var photo_id = req.params.photo_id;
    var artist_id = "";
    Photo.findByIdAndRemove(photo_id, (err, photo) => {
        artist_id = photo.artist_id;
    }).exec().then(() => {
        Gallery.findByIdAndUpdate(req.params.gallery_id, { $pull: {photos: photo_id }}).exec();
    }).then(() => {
        Artist.findByIdAndUpdate(artist_id, { $pull: {photos: photo_id }}).exec();
    }).then(() => {
        listAllPhotos(req.params.gallery_id, res);
    });
};


// POST /artists
// Create a new artist, return an updated list of all artists
exports.createArtist = (req, res) => {
    var artist = new Artist(req.body);
    artist.save()
    .then(() => {
        this.listArtists(0, res);
    });
};


// GET /artists
// Return a list of all artists
exports.listArtists = (req, res) => {
    Artist.find({}, (err, artists) => {
        if (err) res.send(err);
        res.json(artists);
    })
};


// PUT /artists/:artist_id
// Edit an artist, return an updated list of all artists
exports.editArtist = (req, res) => {
    Artist.findByIdAndUpdate(req.params.artist_id, { $set: req.body }).exec()
    .then(() => {
        this.listArtists(0, res);
    });
}


// DELETE /artists/:artist_id
// Delete an artist with given artist_id, and also remove
exports.deleteArtist = (req, res) => {
    var photos = [];
    Artist.findByIdAndRemove(req.params.artist_id, (err, artist) => {
        photos = artist.photos;
    }).then(() => {
        Photo.remove({_id: { $in: photos }}).exec();
    }).then(() => {
        Gallery.update({}, { $pull: { photos: {$in: photos }}}).exec();
    }).then(() => {
        this.listArtists(0, res);
    }).catch((err) => {
        res.send(err)
    });
};


// GET /artists/:artist_id
// Return a list of all photos of the artist
exports.artistView = (req, res) => {
    listAllPhotos(req.params.artist_id, res, 'artistView');
} ;