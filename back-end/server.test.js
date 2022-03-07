const app = require('./server')
const request = require('supertest');



describe('GET /venue', function() {
  it('responds with list of venues', async function() {
    const response = await request(app)
      .get('/api/events')
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(Object.keys(response.body[0])).
    toEqual(['venue_id', 'event_id', 'date', 
    'event_name', 'event_description', 'event_image', 
    'artist_name', 'artist_email', 'genre', 'status', 
    'venue_name', 'venue_geolocation', 'venue_address'
  ])
  })

describe('')
})
