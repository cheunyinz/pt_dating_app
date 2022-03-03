const express = require('express')
const expressHbs = require('express-handlebars')

const app = express()
const port = 8000



//Static Files
app.use(express.static('public'))
// app.use ('/styles', express.static(__dirname + 'public/styles'))
// app.use ('/scripts', express.static(__dirname + 'public/scripts'))
// app.use ('/images', express.static(__dirname + 'public/images'))

//Set Templating Engine
app.set('view engine', 'hbs')
app.engine('hbs', expressHbs.engine({
  extname: 'hbs',
  defaultLayout: 'default_layout.hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials/',
}))


// Navigtion
app.get('/', (req, res) => {
  const pageName = "index"
  res.render('index', {
    pageName
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

app.post('/preference', (req, res) => {
  const pageName = "preference"
  const stepNumber = "2";
  const stepTitle = "Select your preferences";
  res.render('preference', {
    pageName,
    stepNumber,
    stepTitle
  })
})

app.get('/recommendations', (req, res) => {
  const stepName = "Our recommendations";
  res.render('recommendations', {
    stepName
  })
})





app.listen(port, () => {
  console.log(`live on http://localhost:${port}/`)
})