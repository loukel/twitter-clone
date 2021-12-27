import app from '../server'
import request from 'supertest'

describe('Test user endpoints', () => {
  test('GET /api/users succeeds', async () => {
    const res = await request(app).get('/api/users')
    return expect(res.status).toBe(200)
  })

  test('GET /api/users/1 succeeds', async () => {
    const res = await request(app).get('/api/users')
    return expect(res.status).toBe(200)
  })

})