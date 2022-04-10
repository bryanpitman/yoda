const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
app.set('view engine', 'ejs')

const link = 'mongodb+srv://Bryan:babyoda@cluster0.zu8gn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(link, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        app.get('/', (req, res) => {
            console.log("loading homepage")
            quotesCollection.find().toArray()
                .then(results => {
                    console.log(results)
                    res.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))
            
            //res.sendFile("/Users/bryanpitman/Desktop/yoda" + '/index.html')
        })

        app.post('/quotes', (req, res) => {
            console.log(req.body)
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))

        })
    })
    .catch(error => console.error(error))



app.listen(3000, function () {
    console.log('listening on 3000')
})
app.use(bodyParser.urlencoded({ extended: true }))



