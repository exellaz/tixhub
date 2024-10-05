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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});