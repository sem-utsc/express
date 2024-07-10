const express = require('express')
const { body, validationResult } = require('express-validator')
const db = require('./repository/repoFile')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cars', async(req, res) => {
  let carsList = await db.findAll()
  res.status(200).json(carsList)
})

const brandValidator = () => body('brand', 'This field is required').trim().notEmpty()
const modelValidator = () => body('model').trim().notEmpty()

app.post('/cars', brandValidator(), modelValidator(), async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    let insertData = await db.insert(req.body)
    res.status(201).json({message: "ok"})
  }
  res.status(400).json({ errors: result.array() });
})

app.get('/cars/:carId', async (req, res) => {
  let car = await db.findById(req.params.carId)
  if (car) {
    res.status(200).json(car)
  } else {
    res.status(404).json({message: "Car Not Found"})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
