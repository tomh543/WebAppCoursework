
const { init } = require('express/lib/application');
const menuDAO = require('../models/menumodel.js');
const userDao = require('../models/userModel.js');

const db = new menuDAO();

//when user hits landing page db will be initialised
exports.landing_page=function(req,res){
    res.render("about",{
        'title': 'About Us',
        'philosophy': 'Our Philosophy',
        'the-philosophy': 'Prendilo Nella Mia Pancia’s philosophy is allow great local produce to shine in our food. We locate great local producers in the area and make dishes around the great flavours.We aim to provide you with the best ingredients of Glasgow in the classic Italian cuisine.',
        'story': 'Our Story',
        'the-story':'Prendilo Nella Mia Pancia was founded by our Nonnna, Mamma Ario in Silicy where she focused on using local produce and letting it shine in the food she made.I am her daughter Louisa Uigi and i have brought her family values to Glasgow. We are bringing the great Italian Nonna’s dishes into Glasgow and I hope you enjoy!',
        'vision': 'Our Vision',
        'the-vision': 'We believe Prendilo Nella Mia Pancia will become a household name for Sicillian dining within Glasgow,and then expand restaurants throughout the UK providing everyone with the great Italian cuisine using the very best of British Local Produce.'
         });
         db.init();
         db.getAllMenus();
    }

//when user lands on menu page then all entries will be recieved
exports.menu_items=function(req,res){
    res.render("Menu",{
        'title': 'Our Menus',
        'LunchMenu': 'Lunch Menu',
        'ChefSpec': "Chef's Specials",
        'DinnerMenu': 'DinnerMenu',
        'LunchMenuDetail': 'Our fantastic lunch Menu is available between 12:00-15:00 daily.',
        'ChefsSpecialDetail': 'Our Chefs Special Menu is available at either lunch or dinner.',
        'DinnerMenuDetail': 'Our Dinner Menu is available from 16:30 everyday.',
        'Clicktoview':'Please click below to view:',
        'menu1': 'LunchMenu',
        'menu2': 'ChefSpecial',
        'menu3': 'DinnerMenu'
         });
    }

//Menu Item form will be rendered with below mustache tags
exports.new_menu_item=function(req,res){
    res.render("menuform",{
        'title': 'Menu Form',
        'subtitle': 'Enter a Menu Entry',
        'q1': 'Which Menu?',
        'op1': 'Lunch Menu',
        'op2': 'Dinner Menu',
        'op3': 'Chefs Special Item',
        'q2': 'Dish Name',
        'q3': 'Description of Dish',
        'q4': 'Allergy Information',
        'q5': 'Active?',
        'GF': 'Gluten Free',
        'VG':'Vegan',
        'V':'Vegetarian',
        'DF':'Dairy Free',
        'NF':'Nut Free',
        'SF':'Sugar Free',
        'Na':'Not Applicable',
        'Price':'Price   £',
        'true': 'True',
        'false': 'False'
    });
}

//Posts new menu item to the database
exports.post_new_menu_item= function(req,res){
    console.log('processing post_new_menu_item controller');
    db.addEntry(req.body.menu, req.body.DishName,req.body.price, req.body.Description,req.body.allergens,req.body.active);
    console.log("added to DB");
    res.redirect('/Menu');
    ;

}


//Shows the register page
exports.show_register_page=function(req,res){
    res.render("user/register");
    };
    
//shows login page
exports.show_login = function(req, res) {
    res.render("user/login");
     };


//shows contact page
exports.contact=function(req,res){
    res.render("contact",{
        'title': 'Contact Us',
        'subtitle1': 'Get In Touch',
        'subtitle2':'Our Address',
        'subtitle3': 'Opening Hours',
        'phone' : 'Phone : 0141 287 2000',
        'email': 'Email: info@Prendilonellamiapancia.com',
        'addressline1': '7 George Square,',
        'addressline2': 'George Square,',
        'City': 'Glasgow,',
        'post-code': 'G2 IDY',
        'Monday':'Monday: 12 : 00 - 00 : 30',
        'Tuesday':'Tuesday: 12 : 00 - 00 : 30',
        'Wednesday':'Wednesday: 12 : 00-00 : 30',
        'Thursday':'Thursday: 12 : 00 - 00 : 30',
        'Friday':'Friday: 12 : 00 - 01 : 30',
        'Saturday':'Saturday: 12 : 00 - 01 : 30',
        'Sunday':'Sunday: 12 : 00 - 00 : 30'
    });
}

//shows about page
exports.about=function(req,res){
    res.render("about",{
        'title': 'About Us',
        'philosophy': 'Our Philosophy',
        'the-philosophy': 'Prendilo Nella Mia Pancia’s philosophy is allow great local produce to shine in our food. We locate great local producers in the area and make dishes around the great flavours.We aim to provide you with the best ingredients of Glasgow in the classic Italian cuisine.',
        'story': 'Our Story',
        'the-story':'Prendilo Nella Mia Pancia was founded by our Nonnna, Mamma Ario in Silicy where she focused on using local produce and letting it shine in the food she made.I am her daughter Louisa Uigi and i have brought her family values to Glasgow. We are bringing the great Italian Nonna’s dishes into Glasgow and I hope you enjoy!',
        'vision': 'Our Vision',
        'the-vision': 'We believe Prendilo Nella Mia Pancia will become a household name for Sicillian dining within Glasgow,and then expand restaurants throughout the UK providing everyone with the great Italian cuisine using the very best of British Local Produce.'
         });
}


//ability to show all menu items on the lunch menu page - this was used to test db
exports.lunch=function(req,res){
    db.getAllMenus()
        .then((list) =>{
            res.render("LunchMenu",{
                'title': 'Lunch Menu',
                'Menuitems':list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('Promise Rejected', err);
        })
        }

//shows all lunch menu items on the lunch menu
exports.show_lunch_menu=function(req,res){
    console.log('filtering by',req.params.menutype);
        db.getLunchMenu().then((list) =>{
            res.render("LunchMenu",{
                'title': 'Lunch Menu',
                'Menuitems':list
            });
        }).catch((err) => {
            console.log('Error handling Lunch Menu:', err);
        });       
}

//shows all chef specials on the Chef Special Menu
exports.show_specials=function(req,res){
    console.log('filtering by',req.params.menutype);
    db.getspecials().then((list) =>{
        res.render("ChefSpecial",{
            'title': 'Chef Special',
            'Menuitems':list
        });
    }).catch((err) => {
        console.log('Error handling Lunch Menu:', err);
    });
    
}

//shows all dinner items on the Dinner Menu
exports.show_dinner_menu=function(req,res){
    console.log('filtering by',req.params.menutype);
    db.getdinnermenu().then((list) =>{
        res.render("DinnerMenu",{
            'title': 'The Dinner Menu',
            'Menuitems':list
        });
    }).catch((err) => {
        console.log('Error handling Lunch Menu:', err);
    });
    
}

//Posts a new menu item to db
exports.post_new_menu_item= function(req,res){
    console.log('processing post_new_menu_item controller');
    db.addItem(req.body.menu, req.body.DishName,req.body.Description, req.body.allergens,req.body.price,req.body.active);
    console.log("added to DB");
    res.redirect('/Menu');
    ;

}

//Implementing a call back functionality using User Model and redirect to /login
exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    if (!user || !password) {
    res.send(401, 'no user or no password');
    return;
    }
    userDao.lookup(user, function(err, u) {
    if (u) {
    res.send(401, "User exists:", user);
    return;
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect('/login');
    });
    } 