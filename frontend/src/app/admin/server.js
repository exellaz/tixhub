const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Event API');
});

// Endpoint to fetch events
app.get('/api/events', (req, res) => {
  const filePath = path.join(__dirname, 'events.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      const events = JSON.parse(data);
      res.status(200).json(events);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Endpoint to create a new event
app.post('/api/events', (req, res) => {
  const filePath = path.join(__dirname, 'events.json');
  const newEvent = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      const events = JSON.parse(data);

      // Determine the highest existing id
      const maxId = events.reduce((max, event) => (event.id > max ? event.id : max), 0);

      // Increment the id for the new event
      newEvent.id = maxId + 1;

      events.push(newEvent);

      fs.writeFile(filePath, JSON.stringify(events, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error writing file:', writeErr);
          return res.status(500).send('Internal Server Error');
        }

        res.status(201).json(newEvent);
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
