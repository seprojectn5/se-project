var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var shortId = require('shortid');


var app = module.exports = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/book-table.html');
});



const dbName = "restaurant";
const uri = "mongodb+srv://sep1509:thtmhfc1509@hungpham-je7i1.mongodb.net/test?retryWrites=true";
  MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client) {
  if (err) throw err;
  var db = client.db(dbName);
  app.post('/api/book-table', (req, res) => {
    db.collection('user').insertOne({
      customer_name: req.body.name,
      customer_email: req.body.email,
      customer_phoneNumber: req.body.phone,
      customer_date: req.body.date,
      number_of_people: req.body.people
    })
    res.sendFile(process.cwd() + '/views/mainpage.html');
  })
});
app.listen(3000, function() {
    console.log('working');
})