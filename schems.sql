//schema.sql 

//create a database; notes_app
CREATE DATABASE notes_app;

//change the current database to notes_app
USE notes_app;

//create a table in notes_app Database; TABLE_NAME = notes
CREATE TABLE notes(
    id integer AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

//Query to insert data to notes table of Database notes_app
INSERT INTO notes(title, contents)
VALUES('My First Note', 'Hello, I am Vivek'),
    ('My Second Note', 'I am TCW at GFG');