const Datastore = require("nedb");
const bcrypt = require('bcrypt');
const saltRounds = 10;
class UserDAO {
	constructor(dbFilePath) {
		if (dbFilePath) {
			//embedded
			this.db = new Datastore({ filename: dbFilePath,
			autoload: true });
		} else {
			//in memory
			this.db = new Datastore();
	}
}


	// for the app the password is password
	init() {
	this.db.insert({
	user: 'Manager',
	password:
	'password'
	});
	this.db.insert({
	user: 'Admin',
	password:
	'password'
	});
	return this;
    }

    create(username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash) {
             var entry = {
            user: username,
            password: hash,
        };
        that.db.insert(entry, function (err) {
        if (err) {
        console.log("Can't insert user: ", username);
        }
        });
        });
        }
        lookup(user, cb) {
            this.db.find({'user': user}, function (err, entries) {
            if (err) {
            return cb(null, null);
            } else {
            if (entries.length == 0) {
            return cb(null, null);
            }
            return cb(null, entries[0]);
            }
            });
            }
            }
        const dao = new UserDAO();
        dao.init();
        module.exports = dao;