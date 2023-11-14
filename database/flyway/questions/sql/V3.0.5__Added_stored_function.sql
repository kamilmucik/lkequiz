CREATE or replace function lke_select_rand_questions(var_category_id int,var_limit int)
    returns setof lke_questions
    language 'plpgsql'
as $BODY$
BEGIN
    return query select * from lke_questions a WHERE category_id = var_category_id ORDER BY random() LIMIT var_limit;
END;
$BODY$;