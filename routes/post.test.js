import app from '../server'
import request from 'supertest'

describe('Test post endpoints', () => {
  test('GET /api/posts succeeds', async () => {
    const res = await request(app).get('/api/posts')
    return expect(res.status).toBe(200)
  })

  test('GET /api/posts returns JSON', async () => {
    const res = await request(app).get('/api/posts')
      .expect('Content-type', /json/u)
    return res
  })

  let post1Id = -1
  let post2Id = -1
  test('POST /api/posts succeeds', async () => {
    const data = {
      body: "lorem300",
      userId: '1'
    }
    const res = await request(app).post('/api/posts')
      .send(data)
    post1Id = res.body.id
    return expect(res.status).toBe(201)
  })

  test('POST /api/posts returns JSON', async () => {
    const data = {
      body: "lorem300",
      userId: '1'
    }
    const res = await request(app).post('/api/posts')
      .send(data)
    post2Id = res.body.id
    return expect(res.type).toMatch(/json/u)
  })

  test('GET /api/posts/:id succeeds', async () => {
    const res = await request(app).get(`/api/posts/${post1Id}`)
    return expect(res.status).toBe(200)
  })

  test('GET /api/posts/:id returns JSON', async () => {
    const res = await request(app).get(`/api/posts/${post1Id}`)
      .expect('Content-type', /json/u)
    return res
  })

  test('DELETE /api/posts/:id succeeds', async () => {
    const res = await request(app).delete(`/api/posts/${post1Id}`)
    return expect(res.status).toBe(200)
  })

  test('DELETE /api/posts/:id returns JSON', async () => {
    const res = await request(app).delete(`/api/posts/${post2Id}`)
    return expect(res.type).toMatch(/json/u)
  })
})