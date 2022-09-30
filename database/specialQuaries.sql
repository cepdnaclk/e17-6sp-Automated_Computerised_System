USE victa;

CREATE USER 'user1FM' IDENTIFIED BY 'password1FM';

CREATE ROLE 'factory_manager', 'distribution_manager', 'sales_agent', 'victa_admin';
-- DROP ROLE 'factory_manager', 'distribution_manager', 'sales_agent';

-- setting up a role to a user
GRANT 'factory_manager' TO 'user1FM';
FLUSH PRIVILEGES;
SET DEFAULT ROLE 'factory_manager' TO 'user1FM';

GRANT ALL PRIVILEGES ON victa.* TO 'user1FM';

DELETE FROM factory_manager
	WHERE UserName = "user3FM";
INSERT INTO factory_manager VALUES(
	'user1FM', 'password1FM', 'Nimal Perera', '056-1342435');
INSERT INTO product VALUES(
	'cleaner 200ml', 100.00);
INSERT INTO factory_product VALUES(
	'220423cleaner200', '2022-04-23', 500, 500, 'user1FM');
    
-- asssign privilages to each and every role
GRANT ALL ON victa.* TO 'victa_admin';
FLUSH PRIVILEGES;


GRANT SELECT, INSERT, UPDATE, DELETE ON victa.product TO 'factory_manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON victa.factory_product TO 'factory_manager';
GRANT SELECT ON victa.issued_product TO 'factory_manager';

-- GRANT CREATE USER ON *.* TO 'factory_manager';
-- GRANT ROLE_ADMIN ON *.* TO 'factory_manager';
-- GRANT RELOAD ON *.* TO 'factory_manager';
FLUSH PRIVILEGES;

GRANT SELECT, INSERT, UPDATE, DELETE ON victa.issued_product TO 'distribution_manager';
GRANT INSERT, UPDATE
	(DistributionOrderId, BatchNumber, Quantity, 
    IssuedDMUserName, SalesAgentUserName, DestinedShopId) 
    ON victa.distributed_product TO 'distribution_manager';
GRANT SELECT, DELETE ON victa.distributed_product TO 'distribution_manager';

-- GRANT CREATE USER ON *.* TO 'distribution_manager';
-- GRANT ROLE_ADMIN ON *.* TO 'distribution_manager';
-- GRANT RELOAD ON *.* TO 'distribution_manager';
FLUSH PRIVILEGES;

GRANT INSERT, UPDATE (DeliveredQuantity, DeliveryStatus) ON victa.distributed_product TO 'sales_agent';
GRANT SELECT ON victa.distributed_product TO 'sales_agent';
FLUSH PRIVILEGES;

SELECT User, Host FROM mysql.user;
DROP USER 'user1FM'@'localhost';
SHOW GRANTS FOR 'user1FM'@'localhost';
SHOW GRANTS FOR 'user1FM'@'localhost' USING 'factory_manager';



CREATE USER 'victa_admin_1' IDENTIFIED BY 'admin_1';