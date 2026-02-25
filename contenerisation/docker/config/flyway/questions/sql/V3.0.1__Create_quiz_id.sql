ALTER TABLE departments ADD COLUMN quiz_id INT NOT NULL DEFAULT 0;

UPDATE departments SET quiz_id = 1;