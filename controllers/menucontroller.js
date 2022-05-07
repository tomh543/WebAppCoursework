
const { init } = require('express/lib/application');
const res = require('express/lib/response');
const menuDAO = require('../models/menumodel.js');
const userDao = require('../models/userModel.js');
const db = new menuDAO();
db.init();
db.getAllMenus();

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
        'user': 'user',
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

//Posts a new menu item to db
exports.post_new_menu_item= function(req,res){
    console.log('processing post_new_menu_item controller');
    db.addItem(req.body.menu, req.body.DishName,req.body.Description, req.body.allergens,req.body.price,req.body.active);
    console.log("added to DB");
    res.redirect('/Menu');
    ;

}


//Renders Update Form
exports.update_menu_item=function(req,res){
    res.render("updatemenuitem",{
        'title': 'Update Menu Item Form',
        'user': 'user',
        'subtitle': 'Update Menu Item Form',
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
    })
}

//code below should update db however returns 404 error. Shows processing controller
//on terminal suggesting it is called upon, but updated db does not show suggesting it is
//something in the dbupdate() on models
exports.post_menu_update=function(req,res){
    console.log('processing post_menu_update controller');
    db.update(req.body.menu1, req.body.DishName1,req.body.price1, req.body.Description1,req.body.allergens1,req.body.active1);
    console.log("updated DB");
    res.redirect('/Menu');
}

//Provides page for delete menu
exports.delete_menu_item=function(req,res){
    res.render("deleteitem",{
        'user': 'user',
        'subtitle': 'Remove Menu Item',
        'q1': 'Which Menu?',
        'op1': 'Lunch Menu',
        'op2': 'Dinner Menu',
        'op3': 'Chefs Special Item',
        'q2': 'Dish Name',
        })
}

exports.delete_item=function(req,res){
    console.log('processing delete_item controller');
    db.remove(req.body.menu,req.body.DishName);
    console.log("Removed from DB");
    res.redirect('/testremove');
}

//Shows the register page
exports.show_register_page=function(req,res){
    res.render("user/register");
    };
    
//shows login page
exports.show_login = function(req, res) {
    res.render("user/login");
     };

//Handles the user login if successful render page
exports.handle_login = function (req, res) {
    // res.redirect("/Menu");
    res.render("Menu", {
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
        'menu3': 'DinnerMenu',
        user: "user"
    });
  };

//Handles the logout by clearing the authenticated cookie
exports.user_logout= function (req, res) {
    res
    .clearCookie("jwt")
    .status(200)
    .redirect("/");
    }

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
/*exports.lunch=function(req,res){
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
*/

//shows all active lunch menu items on the lunch menu

exports.show_lunch_menu=function(req,res){
    console.log('filtering by',req.params.menutype);
        db.getLunchMenu().then((list) =>{
            res.render("LunchMenu",{
                'title': 'Lunch Menu',
                'active': 'true',
                'Menuitems':list
            });
        }).catch((err) => {
            console.log('Error handling Lunch Menu:', err);
        });       
}

//shows all active chef specials on the Chef Special Menu
exports.show_specials=function(req,res){
    console.log('filtering by',req.params.menutype);
    db.getspecials().then((list) =>{
        res.render("ChefSpecial",{
            'title': 'Chef Special',
            'active': 'true',
            'Menuitems':list
        });
    }).catch((err) => {
        console.log('Error handling Lunch Menu:', err);
    });
    
}

//shows all active dinner items on the Dinner Menu
exports.show_dinner_menu=function(req,res){
    console.log('filtering by',req.params.menutype);
    db.getdinnermenu().then((list) =>{
        res.render("DinnerMenu",{
            'title': 'The Dinner Menu',
            'active': 'true',
            'Menuitems':list
        });
    }).catch((err) => {
        console.log('Error handling Lunch Menu:', err);
    });
    
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