const express = require('express');
const app = express();
const PORT = 3000;

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

// 3. Dynamic device route: http://localhost:3000/device/sensor1
app.get('/device/:deviceName', (req, res) => {
  const { deviceName } = req.params;
  res.send(`Device: ${deviceName}`);
});

// Start listening for requests
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});