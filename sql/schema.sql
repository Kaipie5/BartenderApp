DROP TABLE IF EXISTS cocktails CASCADE;

CREATE TABLE cocktails (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    image_url VARCHAR(255),
    instructions TEXT,
    ingredients TEXT,
    cocktail_id VARCHAR(255),
    cocktail_list integer
  );

  DROP TABLE IF EXISTS cocktail_lists;

CREATE TABLE cocktail_lists (
  "cocktail_list_id" SERIAL PRIMARY KEY,
  "list_name" VARCHAR(255),
  "summary" TEXT,
  "user_id" VARCHAR(255)
);

DROP TABLE IF EXISTS users;
CREATE TABLE "users" (
  "user_name" VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE
);

ALTER TABLE cocktails ADD CONSTRAINT fk_cocktail_lists FOREIGN KEY (cocktail_list) REFERENCES cocktail_lists(cocktail_list_id);

ALTER TABLE cocktail_lists ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_name);