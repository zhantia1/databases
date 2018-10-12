DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;


/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username CHAR(20) UNIQUE
);

CREATE TABLE rooms (
  id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  roomname CHAR(20) UNIQUE
);

CREATE TABLE messages (
  id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user SMALLINT,
  body TEXT,
  room SMALLINT,
  objectid INT,
  createdat INT,
  FOREIGN KEY (user) REFERENCES users (id),
  FOREIGN KEY (room) REFERENCES rooms (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/