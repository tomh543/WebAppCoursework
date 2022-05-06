
const { init } = require('express/lib/application');
const menuDAO = require('../models/menumodel.js');

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
    }
//when user lands on menu page then all entries will be recieved
exports.menu_items=function(req,res){
    res.send('<h1>Test</h1>');
    db.init();
    db.getAllMenus();
    }

exports.new_menu_item=function(req,res){
    res.redirect('/menuform.html');
}

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