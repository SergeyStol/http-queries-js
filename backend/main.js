'use strict';

const express = require('express')
const app = express()
const port = 8080
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
// since express 4.16.0
app.use(express.json()); // fetch, xhr or
app.use(express.urlencoded({extended: false})); // jQuery
// before express 4.16.0
// app.use(bodyParser.json()); // fetch, jQuery, xhr
// app.use(bodyParser.urlencoded({ extended: false })); // jQuery

const multer = require('multer'); // for csv receive
const upload = multer({ dest: 'uploads/' }); // for csv receive

const csv = require('csv-parser'); // for csv parse
const fs = require('fs'); // for csv parse

app.post('/persons', upload.single('file'), (req, res, next) => {
   parseCSV(req.file.path, res);
})

app.post('/persons', (req, res, next) => {
   const body = req.body;
   res.send({name: body.name, surname: body.surname, id: 1});
})

app.get('/', (req, res, next) => {
   console.log('Got it!');
   res.send('Hello world!');
})

app.get('/persons', (req, res, next) => {
   res.send(
      [{id: 1, name: "Sergey", surname: "Stol"},
      {id: 2, name: "Andrew", surname: "Grigoriev"}]);
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

function parseCSV(filePath, res) {
   const persons = [];
   fs.createReadStream(filePath)
      .pipe(csv({headers: true}))
      .on('data', data => persons.push(data))
      .on('end', () => {
         console.log(JSON.stringify(persons));
         res.send(persons);
      })
}