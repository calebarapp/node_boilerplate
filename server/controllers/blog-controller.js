var NedbService = require('../classes/nedbService');

function newBlog() {

}

async function blogById(id) {
    console.log(NedbService);

    res = { status:'SUCCESS'
            ,response: db.findOne(id) };
    return res;
} 

async function allBlogs() {
    return {
        status:"SUCCESS"
        , response: {"msg": "Test"}}
}

module.exports.blogController =  { 
    allBlogs
    , blogById
}