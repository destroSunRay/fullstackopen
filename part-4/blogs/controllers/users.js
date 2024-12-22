const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (password.length < 3) {
      response.status(400).json({ error: 'password must contain atleast 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

userRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs', { user: 0 })

  response.json(users)
})

module.exports = userRouter