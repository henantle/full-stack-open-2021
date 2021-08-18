const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
        console.log('all blogs saved for testing')
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are right amount of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('React patters is included in the response', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)

        expect(contents).toContain('React patterns')
    })

    describe('addition of a new blog', () => {
        test('a valid blog can be added', async () => {
            const newBlog = {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')

            const contents = response.body.map(r => r.title)

            expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
            expect(contents).toContain(
                'Canonical string reduction'
            )
        })

        test('blog without title is not added', async () => {
            const newBlog = {
                author: "Edsger W. Dijkstra",
                likes: 12,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

            const response = await api.get('/api/blogs')
            expect(response.body).toHaveLength(helper.initialBlogs.length)
        })

        test('new blog without likes gets value 0', async () => {
            const newBlog = {
                title: "QBasic Basics",
                author: "I. C. Weaner",
                url: "http://www.geocities.com/rocknroll94",
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)

            const response = await api.get('/api/blogs')
            expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
            expect(response.body[2].likes).toEqual(0)
        })
    })

    describe('viewing a specific blog', () => {
        test('a specific note can be viewed', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToView = blogsAtStart[0]

            const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

            expect(resultBlog.body).toEqual(processedBlogToView)
        })

        test('a specific note has identifying id', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToView = blogsAtStart[0]

            const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

            expect(resultBlog.body).toEqual(processedBlogToView)
            expect(resultBlog.body.id).toBeDefined()
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(
                helper.initialBlogs.length - 1
            )

            const titles = blogsAtEnd.map(r => r.title)

            expect(titles).not.toContain(blogToDelete.title)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})