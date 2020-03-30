const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const socket = require('./socket');

// General setup
const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ extended: false }));

// Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`);
});

// Socket.io
socket(server);

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/lists', require('./routes/lists'));

app.use(express.static(path.join(__dirname, 'client/build')));
