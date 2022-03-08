const app = require('./server')
const request = require('supertest')

const mockQuery = jest.fn().mockResolvedValue(true)
jest.mock('pg-promise', () => () => () => ({
  query: (...args) => mockQuery(...args)
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('POST /api/create_event', () => {
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

  it('creates an event', async () => {
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

  it('failed to create event', async () => {
    mockQuery.mockRejectedValueOnce('fail')
    const response = await request(app)
      .post('/api/create_event')
      .send(testEvent)
      .set('Content-Type', 'application/json')
      .expect(500)
    expect(response.body).toEqual({})
    // expect(response.text).toEqual('Event creation unsuccessful: ' + 'function toString() { [native code] }')
  })
})

describe('GET events test', () => {
  it('returns correct fields', async () => {
    mockQuery.mockResolvedValueOnce([{
      venue_id: 4,
      event_id: 2,
      date: '2022-02-02T00:00:00.000Z',
      event_name: 'The Madness RETURNS',
      event_description: 'Madness Show',
      event_image: 'https://m.media-amazon.com/images/M/MV5BYzIwZTk3ZmMtYzkyOS00ZjMyLTgxZGUtMjU2YmQ0YzIxNjRkXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg',
      artist_name: 'Madness',
      artist_email: 'madness@gigstr.com',
      genre: 'Two-tone',
      status: 'denied',
      venue_name: 'AON',
      venue_geolocation: '3.488064,-2.244152',
      venue_address: 'Carrington, Manchester M31 4BH'
    }])

    const response = await request(app)
      .get('/api/events')

    expect(response.headers['content-type']).toMatch(/json/)
    expect(Object.keys(response.body[0])).toEqual(
      ['venue_id', 'event_id', 'date',
        'event_name', 'event_description', 'event_image',
        'artist_name', 'artist_email', 'genre', 'status',
        'venue_name', 'venue_geolocation', 'venue_address'
      ])
  })
})

describe('PUT /api/event/status', () => {
  const testEvent = {
    event_id: '1',
    status: 'pending'
  }

  it('change event status', async () => {
    const response = await request(app)
      .put('/api/event/status')
      .send(testEvent)
      .set('Content-Type', 'application/json')
      .expect(200)

    expect(mockQuery).toHaveBeenCalledWith(
      `UPDATE event SET status = '${testEvent.status}' WHERE event_id = ${testEvent.event_id}; `
    )

    expect(response.text).toEqual('Status updated successfully')
  })

  it('failed to change event status', async () => {
    mockQuery.mockRejectedValueOnce('')
    const response = await request(app)
      .put('/api/event/status')
      .send(testEvent)
      .set('Content-Type', 'application/json')
      .expect(500)
    expect(response.body).toEqual({})
  })
})
