/*imports the express module*/
const express = require('express');
const router = express.Router();
const controller = require('../controllers/menucontroller');
const {login} =require('../auth/auth');
const {verify} = require('../auth/auth')

//All the routers for the application

router.get("/", controller.landing_page);
router.get('/Menu', controller.menu_items);
router.get('/menuform',verify, controller.new_menu_item);
router.post('/menuform', controller.post_new_menu_item);
router.get('/updatemenuitem',verify, controller.update_menu_item);
router.post('/updatemenuitem', controller.post_menu_update);
router.get('/deleteitem',verify, controller.delete_menu_item);
router.post('/deleteitem',verify, controller.delete_item);
router.get('/contact', controller.contact);
router.get('/about', controller.about);
router.get('/lunch/:menutype', controller.show_lunch_menu);
router.get('/specials/:menutype', controller.show_specials);
router.get('/dinnermenu/:menutype', controller.show_dinner_menu);
router.get('/register',controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get('/login',controller.show_login);
router.post('/login', login, controller.handle_login);
router.get('/logout', verify, controller.user_logout);

//error messages below for if any issue occurs to be returned to the user.

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