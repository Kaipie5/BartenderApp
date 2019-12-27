DROP TABLE IF EXISTS cocktails;

CREATE TABLE cocktails (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    image_url VARCHAR(255),
    instructions TEXT,
    ingredients TEXT
  );

  INSERT INTO cocktails (title, instructions) VALUES ('Good Drink', '1. Add liquor to cup 2. Sip')