/* eslint-disable camelcase */
const express = require('express')
const cors = require('cors')
const postgres = require('pg-promise')()
const app = express()

const db = postgres({
  host: process.env.DB_HOSTNAME || '127.0.0.1',
  database: process.env.DB_NAME || 'gigstr',
  user: process.env.DB_USER || 'gigstr',
  password: process.env.DB_PASSWORD || 'gigstr'
})

app.use(cors())
app.use(express.json())

app.post('/api/create_event', (req, res) => {
  const venueId = req.body.id
  const eventName = req.body.eventName
  const eventDescription = req.body.eventDescription
  const eventImage = req.body.eventImage
  const artistName = req.body.artistName
  const artistEmail = req.body.artistEmail
  const genre = req.body.genre
  const status = req.body.status
  const date = req.body.date
  console.log('body:', req.body)
  console.log('atts:', [venueId, date, eventName, eventDescription, eventImage, artistName, artistEmail, genre, status])
  console.log('db==',db)
  db.query(
    'INSERT INTO event(venue_id, date, event_name, event_description, event_image, artist_name, artist_email, genre, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9) RETURNING event_id;',
    [venueId, date, eventName, eventDescription, eventImage, artistName, artistEmail, genre, status])
    .then(res.status(200).send('Event creation successful'))
})

// get all events
app.get('/api/events', async (req, res) => {
  const events = await db.query('SELECT a.venue_id, event_id, date, event_name, event_description, event_image, artist_name, artist_email, genre, status, venue_name, venue_geolocation, venue_address FROM event a left join listed_venues b on a.venue_id = b.venue_id;')

  res.send(events)
})

// update status of existing event in event table
app.put('/api/event/status', (req, res) => {
  const new_status = req.body.status
  const event_id = req.body.event_id
  console.log('status', new_status)
  db.query(`UPDATE event SET status = '${new_status}' WHERE event_id = ${event_id}; `)
    .then(res.status(200).send('Status updated successfully'))
})

module.exports = app
