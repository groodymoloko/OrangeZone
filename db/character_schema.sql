### Characters SCHEMA

CREATE DATABASE OrangeZone_DB;
USE OrangeZone_DB;

CREATE TABLE characters
(
    id int NOT NULL AUTO_INCREMENT,
    character_name varchar(255) NOT NULL,
    image_link varchar(255) NOT NULL,
    character_description text NOT NULL,
    speed integer(10) NOT NULL,
    intelligence integer(10) NOT NULL,
    luck integer(10) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);