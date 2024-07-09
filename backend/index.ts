import express from 'express';
import jsonServer from 'json-server';

import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve('build')));

app.use(function(_, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api', jsonServer.router('db.json'));


app.listen(port, () => {
  
    console.log(`server started on port ${port}`);
});