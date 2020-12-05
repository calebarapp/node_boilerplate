var express             = require('express');
var path                = require('path');
var blogController      = require('./controllers/blog-controller').blogController;
var NedbService         = require('./classes/nedbService').nedbService;
var app   = express();
var port  = 3000;

//serves route on SPA client for all paths other than 'api'.
app.use(express.static(path.resolve( process.cwd() + '/client/dist' )));

//root blogs request. returns a list of recent blog posts.
app.get('/api/blog', (req, res) => {
    blogController.allBlogs().then((v) => {
        res.send(v);
    });
});

//Forward request to blogController.
app.get('/api/blog/:id?', (req, res) => {
    blogController.blogById(req.params.id).then((v) => {
        res.send(v);
    });
});

app.get('/test/nedb', (req, res) => {
    const nedb = new NedbService();
    nedb.find();
});

app.listen(port, () => {
    console.log('http://localhost:3000');
})