const express = require('express')
require('dotenv').config()

const authRoutes = require('./routes/auth.routes')
const todoRoutes = require('./routes/todo.routes')

const app = express()
app.use(express.json())

app.use(authRoutes)
app.use(todoRoutes)

module.exports = app
