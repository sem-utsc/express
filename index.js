const express = require('express')
const db = require('./repository/repo')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/carts', async(req, res) => {
  let cartsList = await db.findAll()
  res.json(cartsList)
})

app.get('/carts/:cartId', async (req, res) => {
  let cart = await db.findById(req.params.cartId)
  // console.log(cart)
  res.json(cart)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
