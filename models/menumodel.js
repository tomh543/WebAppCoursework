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
        menu:  'Lunch Menu',   
        DishName: 'Lasagne',
        Description: 'Layers of lasagne pasta, Beef Bolognese with a bechamel sauce, baked in our pizza oven. Served with chips and garlic bread',
        allergy: 'Not Applicable',
        price: '12.99',
        active: 'true'

        });
        //to give feedback whether it has been added
        console.log('db entry Lasagne added');

        this.db.insert({
            menu:  'Lunch Menu',   
            DishName: 'Vegetable Pizza',
            Description: '12 inch pizza with our signature tomato sauce topped with buffalo mozzarella and an assortment of roast vegetables, baked in our pizza oven. Served with chips.',
            allergy: 'Not Applicable',
            price: '14.00',
            active: 'true'
    
            });
            //to give feedback whether it has been added
            console.log('db entry Vegetable pizza added');


        }

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

}

module.exports = Menues;