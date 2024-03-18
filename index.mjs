import express, { Router } from "express"
import db from './config/db.mjs'
import routes from './routes/index.mjs'
const app = express()
import cors from 'cors'


app.use(express.json())
app.use(cors())

// CONNECT DATABASE
db.connection.once('open', () => console.log("Connected DATABASE")).on("error", (err) => console.log("error connecting db -->", err))

// PORT LISTEN 
app.listen(3001 , function () {
  console.log('Server is running at port 3001')

})

// ROUTES
app.use('/' , routes)

