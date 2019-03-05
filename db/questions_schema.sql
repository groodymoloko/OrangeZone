### Schema

-- CREATE DATABASE OrangeZone_DB;
USE OrangeZone_DB;

CREATE TABLE questions (
	id int NOT NULL AUTO_INCREMENT,
    difficulty int(15) NOT NULL,
    category varchar(255) NOT NULL,
	question text NOT NULL,
	answer varchar(255) NOT NULL,
    wrongOne varchar(255) NOT NULL,
    wrongTwo varchar(255) NOT NULL,
    wrongThree varchar(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);
