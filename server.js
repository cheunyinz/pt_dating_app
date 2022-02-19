const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('versie 2')
})

app.get('/about', (req,res) => {
    res.send('over de website')
})

app.get('/create_account' , (req,res) =>{
  res.send('account aanmaken')
})

app.listen(port, () => {
  console.log(`test`)
})