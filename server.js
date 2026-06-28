const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let gpioState = "OFF";
let sensorData = {
  bpm: 0,
  spo2: 0,
  validBpm: false,
  validSpo2: false
};

app.get('/status', (req, res) => res.send(gpioState));

app.post('/control', (req, res) => {
  gpioState = req.body.state;
  res.json({ success: true });
});

app.post('/data', (req, res) => {
  sensorData = req.body;
  res.json({ success: true });
});

app.get('/sensor', (req, res) => {
  res.json(sensorData);
});

// این خط مهمه ← PORT رو از Railway میخونه
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
