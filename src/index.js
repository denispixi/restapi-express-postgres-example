const express = require('express')
const morgan = require('morgan')

const app = express()

// middlewares
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(require('./routes'))

app.listen(4000, () => console.log('server on port 4000'))