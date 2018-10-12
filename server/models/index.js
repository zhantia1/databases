var db = require('../db');

var getMessagesQuery = 'SELECT users.username, rooms.roomname, messages.text, messages.objectid, messages.createdat FROM messages, rooms, users WHERE users.id = messages.user AND rooms.id = messages.room;';
var postMessageQuery = 'INSERT INTO messages (text, user, room, objectid, createdat) VALUES (?, (SELECT id FROM users WHERE username = ?), (SELECT id FROM rooms WHERE roomname = ?), ?, ?);';
db.connect();

module.exports = {
  messages: {
    get: function (callback) {
      db.query(getMessagesQuery, null, (err, results) => {
        callback(err, results);
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      db.query('INSERT INTO users (username) VALUES (?)', [message.username], (err) => {
        // if (err) { return callback(err) };
        db.query('INSERT INTO rooms (roomname) VALUES (?)', [message.roomname], (err) => {
          // if (err) { return callback(err) };
          var createdAt = Math.floor(Date.now() / 1000);
          db.query(postMessageQuery, [message.text, message.username, message.roomname, message.objectId, createdAt], (err) => {
            callback(err);
          });
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT username FROM users;', null, (err, results) => {
        callback(err, results);
      });
    }, // a function which produces all the users
    post: function (user, callback) {
      db.query('INSERT INTO users(username) VALUES(?)', [user], (err) => {
        callback(err);
      });
    } // a function which inserts a user into the database
  }
};
