DROP TABLE IF EXISTS cocktails CASCADE;
CREATE TABLE cocktails (
  "cocktail_id" VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(255),
  "description" TEXT,
  "image_url" VARCHAR(255),
  "recipe" TEXT,
  "cocktail_list" VARCHAR(255)
);

DROP TABLE IF EXISTS cocktail_lists;

CREATE TABLE cocktail_lists (
  "cocktail_list_id" VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
  "list_name" VARCHAR(255),
  "summary" TEXT,
  "user_id" VARCHAR(255)
);

DROP TABLE IF EXISTS users;
CREATE TABLE "users" (
  "user_name" VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE
);

DROP TABLE IF EXISTS ingredients;
CREATE TABLE "ingredients" (
  "ingredient_id" VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(255),
  "amount" VARCHAR(255),
  "cocktail" VARCHAR(255)
);


ALTER TABLE cocktails ADD CONSTRAINT fk_cocktail_lists FOREIGN KEY (cocktail_list) REFERENCES cocktail_lists(cocktail_list_id);

ALTER TABLE ingredients ADD CONSTRAINT fk_cocktail FOREIGN KEY (cocktail) REFERENCES cocktails(cocktail_id);

ALTER TABLE cocktail_lists ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_name);


INSERT INTO users (user_name) VALUES('user_test1');

INSERT INTO cocktail_lists ( cocktail_list_id, list_name, summary, user_id ) VALUES('cocktail_test1', 'All', 'A list of all cockatails.', 'user_test1');

INSERT INTO cocktails ( cocktail_id, name, description, image_url, recipe, cocktail_list) VALUES('cocktail1', 'Cockadoodledoo', 'A fizzy bag of fun', '', 'Fizz it, then bag it', 'cocktail_test1');

INSERT INTO ingredients (ingredient_id, name, amount, cocktail) VALUES('ingriedient_test1', 'Fizz', '1/2 oz', 'cocktail1');
INSERT INTO ingredients (ingredient_id, name, amount, cocktail) VALUES('ingriedient_test2', 'Bag', '1 oz', 'cocktail1');

--EXAMPLE QUERIES:

