const express = require('express');
const slug = require('slug');
const toArray = require('to-array');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const multer = require('multer')

const {
  MongoClient
} = require('mongodb');

const {
  ObjectId
} = require('mongodb');
const req = require('express/lib/request');
const {
  response
} = require('express');
let db = null;
require('dotenv').config();


const app = express()
const port = process.env.PORT || 8000



//Static Files
app.use(express.static('public'))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))


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

  // country in mongodb inserten
  let userCountry = {
    name: req.body.country
  };
  await db.collection('user_country').insertOne(userCountry)


  res.render('preference', {
    pageName,
    stepNumber,
    stepTitle
  })
});


//retrieve recommendations based on user preferences
app.get('/recommendations', async (req, res) => {
  const pageName = "recommendations"
  const stepName = "Our recommendations";
  const stepNumber = "3";
  const stepTitle = "Here are your recommendations";
  const locPreference = req.query.countrylocation;
  const wigPreference = req.query.who_is_going;
  const totPreference = req.query.type_of_trip;
  const budPreference = req.query.budget;

  //find locations if the name is locPreference or the region is locPreference or the plabet is earth
  let userQuery1 = {
    $or: [{
      "name": locPreference
    }, {
      "region": locPreference
    }, {
      "planet": locPreference
    }]
  };
  let userQuery2 = {
    "who_is_going": wigPreference,
    "type_of_trip": totPreference,
    "budget": budPreference
  };
  //only show if userQuery1 is true and userQuery 2
  let userQuery = {
    $and: [userQuery1, userQuery2]
  };
  const destinations = await db.collection('destinations').find(userQuery).toArray();

  console.log(userQuery)


  res.render('recommendations', {
    stepName,
    stepTitle,
    stepNumber,
    pageName,
    destinations
  })
})


app.get('/add', (req, res) => {
  const pageName = "add"
  const pageTitle = "Add a recommendation ";
  res.render('addrecommendation', {
    pageTitle,
    pageName,
    layout: 'add_layout.hbs',

  })
})

//add a recommendation + a picture using multer

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/recommendations_countries');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: Storage
})

app.post('/', upload.single('city_image'), async (req, res) => {

  let destination = {
    slug: slug(req.body.city_name),
    city_name: req.body.city_name,
    who_is_going: req.body.who_is_going,
    type_of_trip: req.body.type_of_trip,
    budget: req.body.budget,
    name: req.body.name,
    region: req.body.region,
    city_image: req.file.filename,
    planet:"earth"
  };

  //add the data to the mongodb database
  await db.collection('destinations').insertOne(destination);

  const confirmMessage = "You succesfully added a new recommendation";
  const popUpClass = "showPopup"
  const pageName = "index"
  res.render('index', {
    pageName,
    confirmMessage,
    popUpClass,
    layout: 'landingPage_layout.hbs'
  })
})



//connect to MongoDB
async function connectDB() {
  const mdbURI = process.env.mdbURI;
  const client = new MongoClient(mdbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    db = await client.db(process.env.mdbName);
  } catch (error) {
    console.log(error)
  }
}

//404
app.use(function (req, res, next) {
  const pageTitle = "Sorry, this page does not exist!";
  const pageName = "404"

  res.status(404).render('404', {
    pageTitle,
    pageName,
    layout: 'add_layout.hbs'
  })
})



//connect to port
app.listen(port, () => {
  console.log(`Live on http://localhost:${port}`)
  connectDB()
    .then(() => {
      console.log("Connected to MongoDB!")
    });
});