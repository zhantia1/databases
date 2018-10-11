var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.connect();
      db.query(getMessagesQuery, null, (err, results) => {
        if (err) { throw err };
        callback(results);
      });
      db.end();
    }, // a function which produces all the messages
    post: function (message, callback) {
      db.connect();
      db.query('INSERT INTO users (username) VALUES (?)', [message.username], (err) => { if (err) { throw err; } });
      db.query('INSERT INTO rooms (roomname) VALUES (?)', [message.roomname], (err) => { if (err) { throw err; } });
      db.query(postMessageQuery, [message.text, message.username, message.roomname, message.objectId, message.createdAt], (err) => { if (err) { throw err; } });
      db.end();
      callback();
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {}, // a function which produces all the users
    post: function () {} // a function which inserts a user into the database
  }
};

var getMessagesQuery = 'SELECT users.username, rooms.roomname, messages.body, messages.objectid, messages.createdat FROM messages, rooms, users WHERE users.id = messages.user AND rooms.id = messages.room;';
var postMessageQuery = 'INSERT INTO messages (body, user, room, objectid, createdat) VALUES (?, (SELECT id FROM users WHERE username = ?), (SELECT id FROM rooms WHERE roomname = ?), ?, ?);';