const express = require('express')
const app = express()

const pointCtrl = require('./points')

app.use(express.json())
const PORT = 4200

app.listen(PORT, () => console.log(`Server is barking on port ${PORT}`))

//Get all points
app.post('/api/newPoints', pointCtrl.newPoints)             //Post controller newPoints
app.post('/api/getPoints', pointCtrl.getPoints)             //Post getPoints



