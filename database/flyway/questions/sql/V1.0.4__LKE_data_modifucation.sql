
DROP SEQUENCE IF EXISTS public.departments_id_seq CASCADE;
CREATE SEQUENCE IF NOT EXISTS public.departments_id_seq start 3 increment 1 NO MAXVALUE CACHE 1;
ALTER TABLE ONLY departments ALTER COLUMN id SET DEFAULT nextval('departments_id_seq'::regclass);
SELECT nextval('departments_id_seq');
COMMIT;

DROP SEQUENCE IF EXISTS public.categories_id_seq CASCADE;
CREATE SEQUENCE IF NOT EXISTS public.categories_id_seq start 22 increment 1 NO MAXVALUE CACHE 1;
ALTER TABLE ONLY categories ALTER COLUMN id SET DEFAULT nextval('categories_id_seq'::regclass);
SELECT nextval('categories_id_seq');
COMMIT;

DROP SEQUENCE IF EXISTS public.questions_id_seq CASCADE;
DROP SEQUENCE IF EXISTS public.answers_id_seq CASCADE;
CREATE SEQUENCE IF NOT EXISTS public.questions_id_seq start 3254 increment 1 NO MAXVALUE CACHE 1;
CREATE SEQUENCE IF NOT EXISTS public.answers_id_seq start 13014 increment 1 NO MAXVALUE CACHE 1;
SELECT nextval('questions_id_seq');
COMMIT;

ALTER TABLE ONLY questions ALTER COLUMN id SET DEFAULT nextval('questions_id_seq'::regclass);
ALTER TABLE ONLY answers ALTER COLUMN id SET DEFAULT nextval('answers_id_seq'::regclass);
SELECT nextval('answers_id_seq');
COMMIT;

-- select nextval('categories_id_seq');
