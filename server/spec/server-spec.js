/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'student',
      password: 'student',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages;';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          console.log(results);
          if (err) { console.log(err); }
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].body).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var messageText = 'Death is but a door. Time is but a window. I will be back.';
    var userKey = 'SELECT id FROM users WHERE username = \'Vigo\'';
    var roomKey = 'SELECT id FROM rooms WHERE roomname = \'Museum\'';
    var queryString1 = 'INSERT INTO users (username) VALUE (?);';
    var queryString2 = 'INSERT INTO rooms (roomname) VALUE (?);';
    var queryString3 = 'INSERT INTO messages (user, body, room) VALUES ((SELECT id FROM users WHERE username = \'Vigo\'), \'Death is but a door. Time is but a window. I will be back.\', (SELECT id FROM rooms WHERE roomname = \'Museum\'));';
    var queryArgs = [userKey, messageText, roomKey];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString1, ['Vigo'], (err) => { if (err) { console.log(err); } });
    dbConnection.query(queryString2, ['Museum'], (err) => { if (err) { console.log(err); } });
    dbConnection.query(queryString3, null, function(err) {
      if (err) { console.log(err); }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        if (error) {
          console.log(error);
          done();
        }
        var messageLog = JSON.parse(body);
        expect(messageLog[0].body).to.equal(messageText);
        expect(messageLog[0].roomname).to.equal('Museum');
        done();
      });
    });
  });
});
