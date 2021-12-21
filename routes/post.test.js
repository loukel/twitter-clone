const app = require('../server')
const request = require('supertest')

describe('Test post endpoints', () => {
  // get_posts
  test('GET /api/posts succeeds', async () => {
    const res = await request(app).get('/api/posts')
    return expect(res.status).toBe(200)
  })

  // create_post
  let articleId = -1
  test('POST /api/posts succeeds', async () => {
    const data = {
      "title": "Cool article 3",
      "authorUID": "1234543",
      "body": "Lorem300",
    }
    const res = await request(app).post('/api/posts').send(data)
    articleId = res.body.id
    return expect(res.status).toBe(201)
  })

  // get_article
  test('GET /api/articles/:id succeeds', async () => {
    const res = await request(app).get(`/api/posts/${articleId}`)
    return expect(res.status).toBe(200)
  })

  // update_article
  test('PUT /api/articles/:id succeeds', async () => {
    const data = {
      "title": "Not Cool article 3",
      "body": "Lorem301",
    }
    const res = await request(app).put(`/api/articles/${articleId}`).send(data)
    return expect(res.status).toBe(204)
  })

  // delete_article
  test('DELETE /api/articles/:id succeeds', async () => {
    const res = await request(app).delete(`/api/articles/${articleId}`)
    return expect(res.status).toBe(204)
  })
})