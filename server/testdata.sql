use chat;

INSERT INTO users (username) VALUES ('keiran');
INSERT INTO users (username) VALUES ('tony');
INSERT INTO users (username) VALUES('Vigo');

INSERT INTO rooms (roomname) VALUES ('lobby');
INSERT INTO rooms (roomname) VALUES ('main');
INSERT INTO rooms (roomname) VALUES ('Museum');

INSERT INTO messages VALUES (1, 3, 'Death is but a door. Time is but a window. I\'ll be back.', 3, NULL, NULL);
INSERT INTO messages VALUES (2, 1, 'test text', 1, NULL, NULL);
INSERT INTO messages VALUES (3, 2, 'test text 2', 2, NULL, NULL);

INSERT INTO messages VALUES (4, 1, 'test text3', 1, NULL, NULL);
INSERT INTO messages VALUES (5, 1, 'test text4', 2, NULL, NULL);