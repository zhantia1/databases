var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, data) => {
        if (err) {
          res.end(err);
        } else {
          res.json(data);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = req.body;
      models.messages.post(message, (err) => {
        if (err) {
          console.log(err);
          res.end(JSON.stringify(err));
        } else {
          res.status(201).end('Message successfully posted');
        }
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err, data) => {
        if (err) {
          res.end(err);
        } else {
          res.json(data);
        }
      });
    }, // a function which handles a get request for all users
    post: function (req, res) {
      var user = req.body.username;
      models.users.post(user, (err) => {
        if (err) {
          res.end(JSON.stringify(err));
        } else {
          res.status(201).end('User successfully posted');
        }
      });
    } // a function which handles posting a user to the database 
  }
};

