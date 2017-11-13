var express = require('express');
var router  = express.Router();
var controller = require('../controller/galleryController');


//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/', (req, res) => {
    res.json({ message: "API is running."});
});

router.route('/galleries')
    .get(controller.listGalleries)
    .post(controller.createGallery);

router.route('/galleries/:gallery_id')
    .put(controller.editGallery)
    .delete(controller.deleteGallery)
    .get(controller.galleryView)
    .post(controller.createPhoto)

router.route('/galleries/:gallery_id/:photo_id')
    .put(controller.updatePhoto)
    .delete(controller.deletePhoto)

router.route('/artists')
    .get(controller.listArtists)
    .post(controller.createArtist)

router.route('/artists/:artist_id')
    .put(controller.editArtist)
    .delete(controller.deleteArtist)
    .get(controller.artistView)


module.exports = router;