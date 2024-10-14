const express = require('express'); //express: for building the REST API
const bodyParser = require('body-parser'); //body-parser: for parsing the request body
const cors = require('cors'); //CORS: for allowing cross-origin requests
const fs = require('fs'); //fs: for reading and writing files
const path = require('path'); //path: for working with file and directory paths

const app = express();
const PORT = 3001;

app.use(bodyParser.json({ limit: '10mb' })); 
app.use(cors());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Event API');
});

// Endpoint to fetch events
app.get('/api/events', (req, res) => {
  const filePath = path.join(__dirname, 'events.json');  //get the path of the events.json file

  fs.readFile(filePath, 'utf8', (err, data) => { //read the file from the path
    if (err) { //if failed to read the file
      console.error('Error reading file:', err); 
      return res.status(500).send('Internal Server Error'); 
    }

    try {
      const events = JSON.parse(data); //convert the data read from the file to JSON
      res.status(200).json(events); //send the "events" to the client
    } catch (parseError) { //if failed to parse the data
      console.error('Error parsing JSON:', parseError); //log the error
      res.status(500).send('Internal Server Error');  //send status 500 means internal server error
    }
  });
});

// Endpoint to create a new event
app.post('/api/events', (req, res) => {
  const filePath = path.join(__dirname, 'events.json'); //get the path of the events.json file
  const newEvent = req.body; //get the new event data from the request body

  fs.readFile(filePath, 'utf8', (err, data) => { //read the file from the path
    if (err) {	
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error'); 
    }

    try {
      const events = JSON.parse(data); //convert the data read from the file to JSON

      // Determine the highest existing id
      const maxId = events.reduce((max, event) => (event.id > max ? event.id : max), 0); //

      // Increment the id for the new event
      newEvent.id = maxId + 1;

      events.push(newEvent); // Add the new event to the existing events

      fs.writeFile(filePath, JSON.stringify(events, null, 2), (writeErr) => { //update the file with the new events data
        if (writeErr) { //if failed to write the file
          console.error('Error writing file:', writeErr);
          return res.status(500).send('Internal Server Error');
        }

        res.status(201).json(newEvent); //send new event data to the client
      });
    } catch (parseError) { //if failed to parse the data
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(PORT, () => { //start the server on the specified port
  console.log(`Server is running on http://localhost:${PORT}`);
});