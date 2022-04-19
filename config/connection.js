const {
  connect,
  connection
} = require('mongoose');

// creates database or uses database if already existing 
connect('mongodb://localhost/thought-grams', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
