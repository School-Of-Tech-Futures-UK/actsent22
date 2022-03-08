/* eslint-disable camelcase */
const express = require('express')
const cors = require('cors')
const winston = require('winston')
const postgres = require('pg-promise')()
const app = express()

const db = postgres({
  host: process.env.DB_HOSTNAME || '127.0.0.1',
  database: process.env.DB_NAME || 'gigstr',
  user: process.env.DB_USER || 'gigstr',
  password: process.env.DB_PASSWORD || 'gigstr'
})

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ timestamp: true })
  ]
})

app.use(cors())
app.use(express.json())

app.post('/api/create_event', async (req, res) => {
  const venueId = req.body.id
  const eventName = req.body.eventName
  const eventDescription = req.body.eventDescription
  const eventImage = req.body.eventImage
  const artistName = req.body.artistName
  const artistEmail = req.body.artistEmail
  const genre = req.body.genre
  const status = req.body.status
  const date = req.body.date

  logger.log({
    level: 'info',
    message: 'API request received to create event',
    venueId,
    eventName,
    eventDescription,
    eventImage,
    artistName,
    artistEmail,
    genre,
    status,
    date
  })

  try {
    const newEvent = await db.query(
      'INSERT INTO event(venue_id, date, event_name, event_description, event_image, artist_name, artist_email, genre, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9) RETURNING event_id;',
      [venueId, date, eventName, eventDescription, eventImage, artistName, artistEmail, genre, status])
    res.status(200).send('Event creation successful')
    logger.log({
      level: 'info',
      message: 'Event created successfully',
      eventId: newEvent.event_id,
      eventName,
      eventsCreated: 1
    })
  } catch (error) {
    logger.log({
      level: 'error',
      message: 'Event creation unsuccessful',
      error: error.toString(),
      eventName
    })
    res.status(500).send('Event creation unsuccessful: ' + error.toString)
  }
})

// get all events
app.get('/api/events', async (req, res) => {
  const events = await db.query('SELECT a.venue_id, event_id, date, event_name, event_description, event_image, artist_name, artist_email, genre, status, venue_name, venue_geolocation, venue_address FROM event a left join listed_venues b on a.venue_id = b.venue_id;')

  res.send(events)
})

// update status of existing event in event table
app.put('/api/event/status', async (req, res) => {
  const new_status = req.body.status
  const event_id = req.body.event_id

  logger.log({
    level: 'info',
    message: 'API request received to update event status',
    new_status,
    event_id
  })

  try {
    await db.query(`UPDATE event SET status = '${new_status}' WHERE event_id = ${event_id}; `)
    res.status(200).send('Status updated successfully')
    logger.log({
      level: 'info',
      message: 'Event status updated successfully',
      new_status,
      event_id,
      eventsConfirmed: new_status === 'confirmed' ? 1 : 0,
      eventsDenied: new_status === 'denied' ? 1 : 0
    })
  } catch (error) {
    logger.log({
      level: 'error',
      message: 'Event status update unsuccessful',
      error: error.toString(),
      event_id,
      new_status
    })
    res.status(500).send('Event status update unsuccessful: ' + error.toString)
  }
})

module.exports = app
