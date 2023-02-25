import request from 'supertest'

import app from '../../app'

describe('GET /api/v1/characters', () => {
  it('responds with an array of characters', async () =>
    request(app)
      .get('/api/v1/characters')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length')
        expect(response.body.length).toBe(76)
        expect(response.body[0]).toHaveProperty('name')
        expect(response.body[0]).toHaveProperty('image')
      }))
})

describe('GET /api/v1/characters/:id', () => {
  it('responds with a single character', async () =>
    request(app)
      .get(`/api/v1/characters/${1}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body.id).toBe(1)
        expect(response.body.name).toBe('Airi Sakura')
      }))
  it('responds with a invalid id error', (done) => {
    request(app)
      .get('/api/v1/characters/nosuchid')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done)
  })
  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/characters/${80}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done)
  })
})
