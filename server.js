const express = require('express');
const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

const PORT = 3000;
const sensorData = []; // Your array holding sensor readings

// 1. Root route: http://localhost:3000/
app.get('/', (req, res) => {
  res.send('Hello World');
});

// 2. Status route: http://localhost:3000/status
app.get('/status', (req, res) => {
  res.json({
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

// 3. POST Route: Receive sensor data and store in array
app.post("/device/sensor1/data", (req, res) => {
    const reading = req.body;
    sensorData.push(reading);

    res.json({
        message: "Sensor data received successfully.",
        data: reading
    });
});

// 4. FIX ADDED HERE: GET Route to return all recorded sensor readings
app.get("/device/sensor1/data", (req, res) => {
    res.json(sensorData);
});

// 5. Dynamic device route (Placed below specific routes to avoid URL conflicts)
app.get('/device/:deviceName', (req, res) => {
  const { deviceName } = req.params;
  res.send(`Device: ${deviceName}`);
});

// Start listening for requests
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
