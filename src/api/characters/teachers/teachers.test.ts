import request from 'supertest'

import app from '../../../app'

describe('GET /api/v1/characters/teachers', () => {
  it('responds with an array of teachers', async () =>
    request(app)
      .get('/api/v1/characters/teachers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length')
        expect(response.body.length).toBe(5)
      }))
})
