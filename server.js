const express = require('express')
const app = express()
const port = 8000

app.set ('views', './views')
app.set ('view engine','ejs');


app.get('/', (req, res) => {
  res.render('index', {text: 'dit is een test voor ejs'})
  res.render('index', {heading_2: 'dit is een h2'})
})



app.listen(port, () => {
  console.log(`live on http://localhost:${port}/`)
})

