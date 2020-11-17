const express   = require('express');
const path      = require('path');

const app = express();
const port = 3000;

//serves route on SPA client for all paths other than 'api'.
app.use(express.static(path.resolve( process.cwd() + '/client/dist' )));

//this should forward to controllers
app.get('/api', (req, res) => {
    res.json({"Name": "api"});
})

app.listen(port, () => {
    console.log('running on http://localhost:3000/');
})