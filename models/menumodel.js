/*import NEDB module*/
const Datastore = require('nedb');
const nedb = require('nedb');

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
    }

        

module.exports = Menues;