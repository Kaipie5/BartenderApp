DROP TABLE IF EXISTS cocktails;

CREATE TABLE cocktails (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    image_url VARCHAR(255),
    instructions TEXT,
    ingredients TEXT,
    cocktail_id VARCHAR(255)
  );