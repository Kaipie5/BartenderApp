DROP TABLE IF EXISTS cocktails;
CREATE TABLE "cocktails" (
  "id" VARCHAR(255) PRIMARY KEY,
  "name" VARCHAR(255),
  "description" TEXT,
  "image_url" VARCHAR(255),
  "recipe" TEXT,
  "cocktail_list" VARCHAR(255)
);

DROP TABLE IF EXISTS cocktail_lists;

CREATE TABLE "cocktail_lists" (
  "id" VARCHAR(255) PRIMARY KEY,
  "list_name" VARCHAR(255),
  "summary" TEXT,
  "user" VARCHAR(255)
);

DROP TABLE IF EXISTS users;
CREATE TABLE "users" (
  "name" VARCHAR(255) PRIMARY KEY
);

DROP TABLE IF EXISTS ingredients;
CREATE TABLE "ingredients" (
  "id" VARCHAR(255) PRIMARY KEY,
  "name" VARCHAR(255),
  "cocktail" VARCHAR(255)
);


-- THESE ALTER TABLES MIGHT BE A LITTLE WRONG I NEED TO RESAVE THE FILE FROM THE GRAPHICAL REPRESENATION
ALTER TABLE "cocktail_lists" ADD FOREIGN KEY ("id") REFERENCES "cocktails" ("cocktail_list");

ALTER TABLE "cocktails" ADD FOREIGN KEY ("id") REFERENCES "ingredients" ("cocktail");

ALTER TABLE "users" ADD FOREIGN KEY ("name") REFERENCES "cocktail_lists" ("user");


INSERT INTO users (name) VALUES('user_test1')

INSERT INTO cocktails_lists ( id, list_name, summary, user ) 
VALUES("cocktail_test1", 'All', 'A list of all cockatails.', "user_test1");

INSERT INTO cocktails ( id, name, description, image_url, recipe, cocktail_list) 
VALUES('cocktail1', 'Cockadoodledoo', 'A fizzy bag of fun', '', 'Fizz it, then bag it', 'cocktail_test1');

INSERT INTO ingredients (id, name, cocktail) VALUES("ingriedient_test1", 'Fizz', 'cocktail1')
INSERT INTO ingredients (id, name, cocktail) VALUES("ingriedient_test2", 'Bag', 'cocktail1')
