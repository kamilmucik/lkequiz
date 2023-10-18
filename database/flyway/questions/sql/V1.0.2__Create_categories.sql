DROP TABLE IF EXISTS lke_categories;

CREATE TABLE lke_categories (
    id INT PRIMARY KEY NOT NULL,
    department_id INT,
    own_id INT,
    name VARCHAR(256),
    code VARCHAR(16),
    time_limit INT,
    question_limit INT,
    max_question_limit INT,
    short_learning VARCHAR(10),
    update_date INT ,
    department_name VARCHAR(64)
);

insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (1, 1, 27, 'Ogólne Bezpieczeństwo Wykonywania Lotów', 'PL100', 30, 12, 10, '0', 1, 'PPL(A)');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (2, 1, 37, 'Łączność ', 'PL099', 30, 12, 10, '0', 1, 'PPL(A)');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (3, 1, 31, 'Człowiek Możliwości i Ograniczenia', 'PL040', 30, 12, 306, '0', 1, 'PPL(A)');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (4, 1, 32, 'Meteorologia', 'PL050', 30, 12, 139, '0', 1, 'PPL(A)');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (5, 1, 33, 'Nawigacja', 'PL060', 60, 24, 191, '1', 1, 'PPL(A)');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (6, 1, 29, 'Ogólna Wiedza o Statku Powietrznym', 'PL020', 30, 16, 231, '1', 1, 'PPL(A)');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (7, 1, 30, 'Osiągi i Planowanie Lotu', 'PL030', 60, 20, 55, '1', 1, 'PPL(A)');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (8, 1, 28, 'Prawo Lotnicze', 'PL010', 45, 28, 503, '0', 1, 'PPL(A)');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (9, 1, 34, 'Procedury Operacyjne', 'PL070', 30, 12, 74, '1', 1, 'PPL(A)');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (10, 1, 35, 'Zasady Lotu', 'PL080', 45, 16, 370, '1', 1, 'PPL(A)');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (11, 1, 36, 'Łączność', 'PL090', 30, 12, 108, '0', 1, 'PPL(A)');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (12, 5, 1, 'Człowiek Możliwości i Ograniczenia', 'PL040', 30, 12, 309, '0', 1, 'SPL');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (13, 5, 2, 'Meteorologia', 'PL050', 30, 12, 134, '0', 1, 'SPL');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (14, 5, 3, 'Nawigacja', 'PL060', 40, 12, 90, '0', 1, 'SPL');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (15, 5, 8, 'Ogólna wiedza o statku powietrznym', 'PL025', 30, 12, 46, '0', 1, 'SPL');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (16, 5, 4, 'Ogólne Bezpieczeństwo Wykonywania Lotów', 'PL100', 30, 12, 10, '0', 1, 'SPL');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (17, 5, 5, 'Osiągi i Planowanie Lotu', 'PL030', 25, 8, 37, '0', 1, 'SPL');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (18, 5, 6, 'Prawo Lotnicze', 'PL010', 45, 32, 228, '0', 1, 'SPL');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (19, 5, 7, 'Procedury Operacyjne', 'PL070', 30, 12, 31, '0', 1, 'SPL');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (20, 5, 9, 'Zasady Lotu', 'PL080', 60, 24, 321, '0', 1, 'SPL');
insert into lke_categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (21, 5, 10, 'Łączność', 'PL090', 25, 12, 108, '0', 1, 'SPL');
