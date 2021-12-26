import app from '../server'
import request from 'supertest'

describe('Test like endpoints', () => {
  test('GET /api/likes succeeds', async () => {
    const res = await request(app).get('/api/likes')
    return expect(res.status).toBe(200)
  })

  let likeId = -1
  test('POST /api/likes succeeds', async () => {
    const data = {
      "postId": "1234",
      "userId": "1"
    }
    const res = await request(app).post('/api/likes')
      .send(data)
    likeId = res.body.id
    return expect(res.status).toBe(201)
  })

  test('DELETE /api/likes/:id succeeds', async () => {
    const res = await request(app).delete(`/api/likes/${likeId}`)
    return expect(res.status).toBe(204)
  })
})