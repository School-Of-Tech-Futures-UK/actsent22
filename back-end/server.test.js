const app = require('./server')
const request = require('supertest')

const mockQuery = jest.fn().mockResolvedValue(true)

jest.mock('pg-promise', () => () => () => ({
  query: (...args) => mockQuery(...args)
}))

describe('POST /api/create_event', () => {
  it('creates an event', async () => {
    const testEvent = {
      artistName: 'Mozart',
      date: '2022-03-08',
      id: '1',
      eventDescription: 'so moving',
      genre: 'other',
      artistEmail: 'mozart@gmail.com',
      eventName: 'Requiem',
      status: 'pending',
      eventImage: 'https://picsum.photos/id/1025/4951/3301'
    }
    const response = await request(app)
      .post('/api/create_event')
      .send(testEvent)
      .set('Content-Type', 'application/json')
      .expect(200)

    expect(mockQuery).toHaveBeenCalledWith(
      'INSERT INTO event(venue_id, date, event_name, event_description, event_image, artist_name, artist_email, genre, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9) RETURNING event_id;',
      [testEvent.id, testEvent.date, testEvent.eventName, testEvent.eventDescription, testEvent.eventImage, testEvent.artistName, testEvent.artistEmail, testEvent.genre, testEvent.status]
    )
    expect(response.text).toEqual('Event creation successful')
  })
})

