var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((data)=> {
        res.status(200).json(data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post( ()=> {
        res.status(201).end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {}, // a function which handles a get request for all users
    post: function (req, res) {} // a function which handles posting a user to the database 
  }
};

