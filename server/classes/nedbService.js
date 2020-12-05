var nedb = require('nedb');


class NedbService {
    constructor() {
        this.storePath = '../data/db';
        this.db = new DataStore({ filename: this.storePath });
    }
    insert() {
    }
    //find matching Documents
    find(query) {
        return this.db.find(query, (err, doc) => {
            if(!err) {
                return { 
                    status: 'SUCCESS'
                    , results: doc 
                };
            }
            else {
                return {status : 'FAILED'};
            }
        });
    }
    //find a single matching document
    findOne(query) {
        return this.db.findOne(query, () => {
            if(!err) {
                return { 
                    status: 'SUCCESS'
                    , results: doc 
                };
            }
            else {
                return {status : 'FAILED'};
            }
        });
    }

    delete() {

    }
}

module.nedbService = NedbService