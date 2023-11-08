ALTER TABLE lke_departments ADD COLUMN quiz_id INT NOT NULL DEFAULT 0;

UPDATE lke_departments SET quiz_id = 1;