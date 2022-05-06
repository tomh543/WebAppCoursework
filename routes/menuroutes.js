/*imports the express module*/
const express = require('express');
const router = express.Router();
const controller = require('../controllers/menucontroller');

/*
router.get('/', function(req, res) {
    res.redirect('/about.html');
})
router.get('/Menu', controller.menu_items);

router.get('/menuform', function(req, res) {
    res.redirect('/menuform.html');
})
router.get('/contact', function(req, res) {
    res.redirect('/contact.html');
})

router.get('/about', function(req, res) {
    res.redirect('/about.html');
})
*/

router.get("/", controller.landing_page);
router.get('/Menu', controller.menu_items);
router.get('/menuform', controller.new_menu_item);
router.get('/contact', controller.contact);
router.get('/about', controller.about);

router.use(function(req, res) {
res.status(404);
res.type('text/plain');
res.send('404 Not found.');
})
router.use(function(err, req, res, next) {
res.status(500);
res.type('text/plain');
res.send('Internal Server Error.');
})
module.exports = router;