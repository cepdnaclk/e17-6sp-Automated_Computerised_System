DROP ROLE IF EXISTS 'victa_admin';
CREATE ROLE 'victa_admin';
GRANT ALL PRIVILEGES ON victa.* TO 'victa_admin';
GRANT CREATE USER ON *.* TO 'victa_admin';
GRANT ROLE_ADMIN ON *.* TO 'victa_admin';
GRANT RELOAD ON *.* TO 'victa_admin';
FLUSH PRIVILEGES;

DROP USER IF EXISTS 'victa_admin_1';
CREATE USER 'victa_admin_1' IDENTIFIED BY 'admin_1';

GRANT 'victa_admin' TO 'victa_admin_1';
FLUSH PRIVILEGES;

SET DEFAULT ROLE 'victa_admin' TO 'victa_admin_1';

SELECT User, Host FROM mysql.user;

/*
DROP USER 'victa_admin_1';

DROP ROLE 'sales_agent';
DROP ROLE 'distribution_manager';
DROP ROLE 'factory_manager';
DROP ROLE 'victa_admin';
*/
