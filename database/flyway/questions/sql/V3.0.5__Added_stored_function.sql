CREATE or replace function select_rand_questions(var_category_id int,var_limit int)
    returns setof questions
    language 'plpgsql'
as $BODY$
BEGIN
    return query select * from questions a WHERE category_id = var_category_id ORDER BY random() LIMIT var_limit;
END;
$BODY$;