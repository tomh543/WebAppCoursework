/*import NEDB module*/
const { reject } = require('bcrypt/promises');
const req = require('express/lib/request');
const Datastore = require('nedb');
const nedb = require('nedb');
const { resolve } = require('path');
const { updateitems } = require('../controllers/menucontroller');

/*Creation of the Database*/

class Menues {

    constructor (dbFilePath){
        if(dbFilePath){
            this.db = new nedb({filename: dbFilePath, autoload: true});
            console.log('DB connected to ' + dbFilePath);
        } else {
          this.db = new nedb();
        }
    }

        //Function to retrieve all Menu items
        getAllMenus(){
            return new Promise ((resolve, reject)=> {
                this.db.find({}, function(err, docs) {
                    if(err){
                        reject(err);
                        console.log('getAllMenus promise was rejected')
                    } else {
                        resolve(docs);
                        console.log('getAllMenus promise was resolved, returned', docs)
                    }
                })
            })
        }

        //Retrieves all Entries from DB for when menu = LunchMenu
        getLunchMenu(){
            return new Promise ((resolve, reject)=> {
                this.db.find({'menu': 'LunchMenu'}, function(err, docs) {
                    if(err){
                        reject(err);
                        console.log('getMenubytype promise was rejected')
                    } else {
                        resolve(docs);
                        console.log('getLunchMenu() promise was resolved, returned', docs)
                    }
                    })
            })
        }

        //Retrieves all Entries from DB for when menu = ChefSpecial
        getspecials(){
            return new Promise ((resolve, reject)=> {
                this.db.find({'menu': 'ChefSpecial'}, function(err, docs) {
                    if(err){
                        reject(err);
                        console.log('getMenubytype promise was rejected')
                    } else {
                        resolve(docs);
                        console.log('getspecials() promise was resolved, returned', docs)
                    }
                })
            })
        }


        //Retrieves all Entries from DB for when menu = DinnerMenu
        getdinnermenu(){
        return new Promise ((resolve, reject)=> {
            this.db.find({'menu': 'DinnerMenu'}, function(err, docs) {
                if(err){
                    reject(err);
                    console.log('getMenubytype promise was rejected')
                } else {
                    resolve(docs);
                    console.log('getdinnermenu() promise was resolved, returned', docs)
                }
            })
        })
    }

    //Adds New Entry into the Database
    addItem(menu, DishName, Description,allergy,price,active) {
        var entry = {
        menu: menu,
        DishName: DishName,
        Description: Description,
        allergy: allergy,
        price: price,
        active: active
    }
        console.log('entry created', entry);
        this.db.insert(entry, function(err, doc) {
        if (err) {
        console.log('Error inserting Menu Item', DishName);
        } else {
        console.log('document inserted into the database', doc);
        }
        }) }
   

        //currently when user clicks update menu, they recieve a 404 error i could not resolve
        //the below code should update the entry for Dishname using the request form
    update(menu, DishName, Description,allergy,price,active)   {
               this.db.update(
                {DishName: req.body.DishName1},
                {$set: {menu: req.body.menu1}},
                {$set: {Description: req.body.Description1}},
                {$set: {allergy: req.body.allergens1}},
                {$set: {price: req.body.price1}},
                {$set: {active: req.body.active1}},
                {_id: req.body._id},
                {},
                function (err,docs){
                    if (err){
                        console.log("error updating documents", err);
                    }else {
                        console.log(docs, "Dish updated")
                    }
                    }

               )}
           
        //currently when user clicks update menu, they recieve an internal server error i could not resolve
        //the below code should remove the entry for Dishname using the request form         
    remove(){
        this.db.remove({DishName: req.body.DishName},{menu: req.body.menu},{}, function(err,doc){
            if (err) {
                console.log("error deleting document");
              } else {
                console.log(docs, "document removed from database");
                 }
                }
               )}


    /*adding documents into the Menues class*/
    init(){
        this.db.insert({
        menu:  'DinnerMenu',   
        DishName: 'Lasagne',
        Description: 'Layers of lasagne pasta, Beef Bolognese with a bechamel sauce, baked in our pizza oven. Served with chips and garlic bread',
        allergy: 'N/A',
        price: '12.99',
        active: 'true'

        });
        //to give feedback whether it has been added
        console.log('db entry Lasagne added');

        this.db.insert({
            menu:  'LunchMenu',   
            DishName: 'Vegetable Pizza',
            Description: '12 inch pizza with our signature tomato sauce topped with buffalo mozzarella and an assortment of roast vegetables, baked in our pizza oven. Served with chips.',
            allergy: 'V',
            price: '14.00',
            active: 'true'
    
            });
            //to give feedback whether it has been added
            console.log('db entry Vegetable pizza added');


        this.db.insert({
            menu:  'ChefSpecial',   
            DishName: 'Strawberry Pana Cotta',
            Description: 'A vanilla and strawberry pana cotta, covered in a strawberry glaze. Served with fresh strawberries and a shortbread biscuit.',
            allergy: 'V',
            price: '10.99',
            active: 'true'
    
            });
            //to give feedback whether it has been added
            console.log('db entry Strawberry Pana Cotta added');
        
            //active set to false entry should not appear on dinner menu
        this.db.insert({
                menu:  'DinnerMenu',   
                DishName: 'Chicken Pasta',
                Description: 'Penne Pasta, with chicken breast strips, served in a tomato and balsamic sauce',
                allergy: 'N/A',
                price: '11.99',
                active: 'false'
        
                });
                //to give feedback whether it has been added
                console.log('db entry Chicken Pasta added');
        
        this.db.insert({
                menu:  'LunchMenu',   
                DishName: 'Chicken Pasta',
                Description: 'Penne Pasta, with chicken breast strips, served in a tomato and balsamic sauce',
                allergy: 'N/A',
                price: '8.99',
                active: 'true'
        
                });
                //to give feedback whether it has been added
                console.log('db entry Lunch Chicken Pasta added');

                //active set to false should not appear on menu
        this.db.insert({
                menu:  'LunchMenu',   
                DishName: 'Chicken and chips',
                Description: 'Whole roasted chicken with Oregano, served with a mountain of chips',
                allergy: 'SF',
                price: '9.99',
                active: 'false'
        
                });
                //to give feedback whether it has been added
                console.log('db entry Lunch Chicken and Chips added');


        this.db.insert({
            menu:  'ChefSpecial',   
            DishName: 'Scallops of Sicily',
            Description: 'Warwick Davis, favourite. Freshly caught scallops served with a pea puree, and fresh peas. ',
            allergy: 'N/A',
            price: '13.99',
            active: 'true'
    
            });
            //to give feedback whether it has been added
            console.log('db entry Scallops added');
        }
    }           

        
module.exports = Menues;