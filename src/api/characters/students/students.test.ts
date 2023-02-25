import request from 'supertest'

import app from '../../../app'

describe('GET /api/v1/characters/students', () => {
  it('responds with an array of students', async () =>
    request(app)
      .get('/api/v1/characters/students')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length')
        expect(response.body.length).toBe(66)
      }))
})
