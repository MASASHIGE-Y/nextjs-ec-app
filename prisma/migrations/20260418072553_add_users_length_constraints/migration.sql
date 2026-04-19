ALTER TABLE "users" ADD CONSTRAINT "users_name_length_check" CHECK (length("name") >= 1);
ALTER TABLE "users" ADD CONSTRAINT "users_email_length_check" CHECK (length("email") >= 1);
ALTER TABLE "users" ADD CONSTRAINT "users_password_length_check" CHECK (length("password") >= 1);