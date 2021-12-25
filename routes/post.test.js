import app from '../server'
import request from 'supertest'

describe('Test post endpoints', () => {
  // Get_posts
  test('GET /api/posts succeeds', async () => {
    const res = await request(app).get('/api/posts')
    return expect(res.status).toBe(200)
  })

  // Create_post
  let postId = -1
  test('POST /api/posts succeeds', async () => {
    const data = {
      "body": "lorem300",
    }
    const res = await request(app).post('/api/posts')
      .send(data)
    postId = res.body.id
    return expect(res.status).toBe(201)
  })

  // Get_post
  test('GET /api/posts/:id succeeds', async () => {
    const res = await request(app).get(`/api/posts/${postId}`)
    return expect(res.status).toBe(200)
  })

  // Delete_post
  test('DELETE /api/posts/:id succeeds', async () => {
    const res = await request(app).delete(`/api/posts/${postId}`)
    return expect(res.status).toBe(204)
  })
})