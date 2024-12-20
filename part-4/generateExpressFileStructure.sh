#!/bin/bash

# exit the program if $1 is not provided
if [ -z "$1" ]; then
  echo "Error: No project name provided."
  echo "Usage: $0 <project-name>"
  exit 1
fi

# Define the project structure
directories=(
  "$1"
  "$1/controllers"
  "$1/models"
  "$1/utils"
)

files=(
  "$1/.env"
  "$1/index.js"
  "$1/app.js"
  "$1/.gitignore"
  "$1/utils/middleware.js"
  "$1/utils/config.js"
  "$1/utils/logger.js"
)

# Create directories
for dir in "${directories[@]}"; do
  mkdir -p "$dir"
done

# Create files
for file in "${files[@]}"; do
  touch "$file"
done

cd "$1"
echo "node_modules
.env" > .gitignore

echo "PORT = 3001" > .env

echo "require('dotenv').config()

const PORT = process.env.PORT

module.exports = {
  PORT
}" > utils/config.js

echo "const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}" > utils/middleware.js

echo "const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}" > utils/logger.js

echo "
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')


app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app" > app.js

echo "const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(\`Server running on port \${config.PORT}\`)
})" > index.js

# Initialize npm and install express
npm init -y
npm install express dotenv cors nodemon

echo "Express project structure generated successfully."