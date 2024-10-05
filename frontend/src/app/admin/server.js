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

app.post('/api/events', (req, res) => {
  const eventData = req.body;

  const filePath = path.join(__dirname, 'events.json');

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    // Create the file with an empty array if it doesn't exist
    fs.writeFileSync(filePath, JSON.stringify([]));
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }

    let events = [];
    if (data) {
      events = JSON.parse(data);
    }

    // Generate a new id for the event
    const newId = events.length > 0 ? events[events.length - 1].id + 1 : 1;
    const newEvent = { id: newId, ...eventData };

    events.push(newEvent);

    fs.writeFile(filePath, JSON.stringify(events, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.status(200).send('Event data saved successfully');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
