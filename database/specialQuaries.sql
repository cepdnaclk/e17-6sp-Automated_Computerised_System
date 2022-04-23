USE victa;

CREATE USER 'user1FM'@'localhost' IDENTIFIED BY 'password1FM';
GRANT 'factory_manager' TO 'user1FM'@'localhost';
-- GRANT USAGE ON victa.* TO 'user1FM'@'localhost';
FLUSH PRIVILEGES;
SET DEFAULT ROLE ALL TO 'user1FM'@'localhost';

GRANT ALL PRIVILEGES ON victa.* TO 'user1FM'@'localhost';

DELETE FROM factory_manager
	WHERE UserName = "user3FM";
INSERT INTO factory_manager VALUES(
	'user1FM', 'password1FM', 'Nimal Perera', '056-1342435');
    
CREATE ROLE 'factory_manager', 'distribution_manager', 'sales_agent';
-- DROP ROLE 'factory_manager', 'distribution_manager', 'sales_agent';

-- GRANT USAGE ON victa.* TO 'factory_manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON victa.product TO 'factory_manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON victa.factory_manager TO 'factory_manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON victa.distribution_manager TO 'factory_manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON victa.factory_product TO 'factory_manager';
GRANT INSERT (BatchNumber, IssuedDate, IssuedQuantity, CurrentQuantity, IssuedProductName, IssuedFMUserName) ON victa.issued_product TO 'factory_manager';
GRANT UPDATE (BatchNumber, IssuedDate, IssuedQuantity, CurrentQuantity, IssuedProductName, IssuedFMUserName) ON victa.issued_product TO 'factory_manager';
GRANT SELECT, DELETE ON victa.issued_product TO 'factory_manager';
GRANT CREATE USER ON *.* TO 'factory_manager';
GRANT ROLE_ADMIN ON *.* TO 'factory_manager';
GRANT RELOAD ON *.* TO 'factory_manager';
FLUSH PRIVILEGES;

SELECT User, Host FROM mysql.user;
DROP USER 'user2FM'@'localhost';
SHOW GRANTS FOR 'user1FM'@'localhost';
SHOW GRANTS FOR 'user1FM'@'localhost' USING 'factory_manager';