require('dotenv').config()

const express = require('express')

const app = express()

const morgan = require('morgan')
app.use(morgan(':method :url: :status :res[content-length] - :response-time ms'))

app.use(require('express-status-monitor')())

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (error) => console.log(error))

db.once('open', () => console.log('Connected to Mongo DB'))

app.use(express.json())

const postsRouter = require('./routes/posts')
app.use('/v1/posts', postsRouter)

app.listen(3000, () => console.log('Server started.'))