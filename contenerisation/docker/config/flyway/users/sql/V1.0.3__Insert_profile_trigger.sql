CREATE OR REPLACE FUNCTION fn_create_profile_after_user_insert()
RETURNS trigger AS $$
BEGIN
  -- Wstawienie profilu powiązanego z nowo dodanym użytkownikiem
  INSERT INTO profiles(user_id, fullname, username, profile_image_url,onboarding_completed)
  VALUES (NEW.id, '', '', '', false);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_create_profile_after_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION fn_create_profile_after_user_insert();