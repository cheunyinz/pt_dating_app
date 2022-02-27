const express = require('express')
const expressHbs = require('express-handlebars')

const app = express()
const port = 8000



//Static Files
app.use(express.static('public'))
app.use ('/styles', express.static(__dirname + 'public/styles'))
app.use ('/scripts', express.static(__dirname + 'public/scripts'))
app.use ('/images', express.static(__dirname + 'public/images'))

//Set Templating Engine
app.set('view engine','hbs')
app.engine('hbs',expressHbs.engine({
  extname: 'hbs',
  defaultLayout: 'default_layout.hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials/',
}))


// Navigtion
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/register', (req, res) => {
  res.render ('register')
})

app.get('/about', (req, res) => {
  res.render ('about')
})




app.listen(port, () => {
  console.log(`live on http://localhost:${port}/`)
})

