const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://Rodriguez:hp5Wvyv8ylVMHgad@cluster0-bnn0y.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "weightTracker";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
              throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

//gets html template
app.get('/', (req, res) => {
  // console.log(db)
  db.collection('weight').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {weight: result})
  })
})


app.post('/addData', (req, res) => {
  db.collection('weight').save({userWeight: req.body.currentWeight, userDate: req.body.currentDate}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/update', (req, res) => {
  console.log(req.body.userWeight)
  db.collection('weight')
  .findOneAndUpdate({userWeight: req.body.userWeight, userDate: req.body.userDate}, {
    $set: {
      userWeight: req.body.newWeight,
      userDate: req.body.newDate

    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


// app.put('/decrease', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbUp:req.body.thumbDown - 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.delete('/deletePost', (req, res) => {
  console.log(req.body.userWeight)
  db.collection('weight').findOneAndDelete({userWeight: req.body.userWeight, userDate: req.body.userDate}, (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'Message deleted!'})
    // res.json(result, message: "message deleted")
  })
})
