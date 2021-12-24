import app from '../server'
import supertest from 'supertest'

describe('Test post endpoints', () => {
  // Get_posts
  test('GET /api/posts succeeds', async () => {
    const res = await supertest(app).get('/api/posts')
    return expect(res.status).toBe(200)
  })

  // Create_post
  let articleId = -1
  test('POST /api/posts succeeds', async () => {
    const data = {
      "title": "Cool article 3",
      "authorUID": "1234543",
      "body": "Lorem300",
    }
    const res = await supertest(app).post('/api/posts')
      .send(data)
    articleId = res.body.id
    return expect(res.status).toBe(201)
  })

  // Get_article
  test('GET /api/posts/:id succeeds', async () => {
    const res = await supertest(app).get(`/api/posts/${articleId}`)
    return expect(res.status).toBe(200)
  })

  // Update_article
  test('PUT /api/posts/:id succeeds', async () => {
    const data = {
      "title": "Not Cool article 3",
      "body": "Lorem301",
    }
    const res = await supertest(app).put(`/api/posts/${articleId}`)
      .send(data)
    return expect(res.status).toBe(204)
  })

  // Delete_article
  test('DELETE /api/posts/:id succeeds', async () => {
    const res = await supertest(app).delete(`/api/posts/${articleId}`)
    return expect(res.status).toBe(204)
  })
})