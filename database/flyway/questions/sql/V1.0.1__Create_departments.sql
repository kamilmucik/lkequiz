DROP TABLE IF EXISTS departments;
 
CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    own_id INT NOT NULL,
    name TEXT NOT NULL,
    active INT  NOT NULL DEFAULT '0',
    update_date TEXT NOT NULL
);


insert into departments (id, own_id, name, active, update_date) values (1, 1, 'Pytania LKE do licencji pilota samolotowego PPL(A)', '1', 1531913997959);
insert into departments (id, own_id, name, active, update_date) values (2, 5, 'Pytania LKE do licencji pilota szybowcowego PL(G)', '1', 1531913998138);