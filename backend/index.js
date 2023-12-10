const connectToMongoose =  require("./db")
connectToMongoose()
const express = require('express')
var cors = require('cors') 


const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

//Available routes
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`Backend running on port http://localhost:${port}`)
})