const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let gpioState = "OFF";

app.get('/status', (req, res) => {
  res.send(gpioState);
});

app.post('/control', (req, res) => {
  gpioState = req.body.state;
  res.json({ success: true, state: gpioState });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`سرور روی پورت ${PORT} اجرا شد`);
});
