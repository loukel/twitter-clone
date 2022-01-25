import app from '../server'
import request from 'supertest'

describe('Test like endpoints', () => {
  test('GET /api/likes succeeds', async () => {
    const res = await request(app).get("/api/likes?userId='1'")
    return expect(res.status).toBe(200)
  })

  test('GET /api/likes returns JSON', async () => {
    const res = await request(app).get("/api/likes?userId='1'")
      .expect('Content-type', /json/u)
    return res
  })

  let like1Id = -1
  let like2Id = -1
  test('POST /api/likes succeeds', async () => {
    const data = {
      "postId": "1234",
      "userId": "1"
    }
    const res = await request(app).post('/api/likes')
      .send(data)
    like1Id = res.body.id
    return expect(res.status).toBe(201)
  })

  test('POST /api/likes returns JSON', async () => {
    const data = {
      "postId": "1234",
      "userId": "1"
    }
    const res = await request(app).post('/api/likes')
      .send(data)
    like2Id = res.body.id
    return expect(res.type).toMatch(/json/u)
  })

  test('DELETE /api/likes/:id succeeds', async () => {
    const res = await request(app).delete(`/api/likes/${like1Id}`)
    return expect(res.status).toBe(200)
  })

  test('DELETE /api/likes/:id returns JSON', async () => {
    const res = await request(app).delete(`/api/likes/${like2Id}`)
    return expect(res.type).toMatch(/json/u)
  })
})