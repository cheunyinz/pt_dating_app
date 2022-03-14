const express = require('express');
const slug = require('slug');
const toArray = require('to-array');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const multer = require('multer')


const {
  MongoClient
} = require('mongodb');

const{ObjectId} = require('mongodb');
const req = require('express/lib/request');
const { response } = require('express');

require('dotenv').config();
let db = null;


const app = express()
const port = process.env.PORT || 8000



//Static Files
app.use(express.static('public'))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


//Set Templating Engine
app.set('view engine', 'hbs')
app.engine('hbs', expressHbs.engine({
  extname: 'hbs',
  defaultLayout: 'default_layout.hbs',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
}))


// Navigtion
app.get('/', (req, res) => {
  const pageName = "index"
  res.render('index', {
    pageName,
    layout: 'landingPage_layout.hbs'
  })
})

app.get('/register', (req, res) => {
  const pageName = "register"
  const stepNumber = "1"
  const stepTitle = "Create an account";
  res.render('register', {
    pageName,
    stepNumber,
    stepTitle
  })

})

app.post('/preference', async (req, res) => {
  const pageName = "preference"
  const stepNumber = "2";
  const stepTitle = "Select your preferences";

  //country in mongodb inserten
  // let userCountry = {
  //   name: req.body.country
  // };
  // await db.collection('user_country').insertOne(userCountry)



  res.render('preference', {
    pageName,
    stepNumber,
    stepTitle,
    regionName
  })
});


//retrieve recommendations based on user preferences
app.get('/recommendations', async (req, res) => {
  const pageName = "recommendations"
  const stepName = "Our recommendations";
  const stepTitle = "Here are your recommendations";
  const destinations = await db.collection('destinations').find(req.query).toArray();
  
  res.render('recommendations', {
    stepName,
    stepTitle,
    pageName,
    destinations
  })
})


app.get('/add', (req,res) =>{
  const pageName = "add"
  const pageTitle = "Add a recommendation ";
  res.render('addrecommendation',{
    pageTitle,
    pageName,
    layout: 'add_layout.hbs',
    
  })
})

//add a recommendation

app.post('/', async (req, res) => {
  let destination = {
    slug: slug(req.body.city_name),
    city_name: req.body.city_name,
    who_is_going: req.body.who_is_going,
    type_of_trip: req.body.type_of_trip,
    budget: req.body.budget
  };
  await db.collection('destinations').insertOne(destination);
  
  const pageName = "index"
  res.render('index', {
    pageName,
    layout: 'landingPage_layout.hbs'
  })
})



//connect to MongoDB
async function connectDB() {
  const mdbURI = process.env.mdbURI;
  const client = new MongoClient(mdbURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try{
    await client.connect();
    db = await client.db(process.env.mdbName);
  } catch (error){
    console.log(error)
  }
}



//connect to port
app.listen(port, () => {
  console.log(`Live on http://localhost:${port}`)
  connectDB()
  .then(() => {
    console.log("Connected to MongoDB!")
  });
});