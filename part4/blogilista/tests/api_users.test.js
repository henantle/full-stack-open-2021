const bcrypt = require('bcrypt')
const User = require('../models/user')

//...

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'admin', passwordHash })

        await user.save()
    })

    test('creation succeeds with a new username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'testitunnus',
            name: 'Tiina Testaaja',
            password: 'salasana123',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'admin',
            name: 'Uber User',
            password: 'passu123',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ad',
            name: 'Uber User',
            password: 'passu123',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username length should be more than 3')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'admin',
            name: 'Uber User',
            password: 'pa',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password length should be more than 3')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is missing', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'admin',
            name: 'Uber User',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username and password both are required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})