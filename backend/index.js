const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

//for 5000 port in local hist 
app.use(cors())
//to use req.body we have to use middleware for json
app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Notebokk backend app listening on port http://localhost:${port}/`)
})