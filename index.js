const express = require('express');
const path = require('path');
const itemController = require('./controllers/itemController');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})

// routes
app.post("/create", itemController.create);
app.post("/complete", itemController.update);
app.post("/delete", itemController.delete);
app.post("/update", itemController.update);
app.get("/items", itemController.index);

app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

