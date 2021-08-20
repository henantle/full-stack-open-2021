const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.username || !body.password) {
        return response.status(400).send({
            error: 'username and password both are required'
        })
    }
    if (body.username.length < 4) {
        return response.status(400).send({
            error: 'username length should be more than 3'
        })
    }
    if (body.password.length < 4) {
        return response.status(400).send({
            error: 'password length should be more than 3'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter