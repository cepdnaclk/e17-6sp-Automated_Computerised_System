USE victa;

CREATE USER 'user1FM' IDENTIFIED BY 'password1FM';
GRANT 'factory_manager' TO 'user1FM';
-- GRANT USAGE ON victa.* TO 'user1FM'@'localhost';
FLUSH PRIVILEGES;
SET DEFAULT ROLE ALL TO 'user1FM';

GRANT ALL PRIVILEGES ON victa.* TO 'user1FM';

DELETE FROM factory_manager
	WHERE UserName = "user3FM";
INSERT INTO factory_manager VALUES(
	'user1FM', 'password1FM', 'Nimal Perera', '056-1342435');
INSERT INTO product VALUES(
	'cleaner 200ml', 100.00);
INSERT INTO factory_product VALUES(
	'220423cleaner200', '2022-04-23', 500, 500, 'user1FM');
    
CREATE ROLE 'factory_manager', 'distribution_manager', 'sales_agent';
-- DROP ROLE 'factory_manager', 'distribution_manager', 'sales_agent';

GRANT SELECT, INSERT, UPDATE, DELETE ON victa.product TO 'factory_manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON victa.factory_manager TO 'factory_manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON victa.distribution_manager TO 'factory_manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON victa.factory_product TO 'factory_manager';
GRANT INSERT (BatchNumber, IssuedDate, IssuedQuantity, CurrentQuantity, IssuedProductName, IssuedFMUserName, ReceivingStatus) ON victa.issued_product TO 'factory_manager';
GRANT UPDATE (BatchNumber, IssuedDate, IssuedQuantity, CurrentQuantity, IssuedProductName, IssuedFMUserName, ReceivingStatus) ON victa.issued_product TO 'factory_manager';
GRANT SELECT, DELETE ON victa.issued_product TO 'factory_manager';
GRANT CREATE USER ON *.* TO 'factory_manager';
GRANT ROLE_ADMIN ON *.* TO 'factory_manager';
GRANT RELOAD ON *.* TO 'factory_manager';
FLUSH PRIVILEGES;

GRANT SELECT, INSERT, UPDATE, DELETE ON victa.sales_agent TO 'distribution_manager';
GRANT INSERT (ReceivedQuantity, ReceivingStatus, CheckedDMUserName) ON victa.issued_product TO 'distribution_manager';
GRANT UPDATE (ReceivedQuantity, ReceivingStatus) ON victa.issued_product TO 'distribution_manager';
GRANT SELECT, DELETE ON victa.issued_product TO 'distribution_manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON victa.shop TO 'distribution_manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON victa.distributed_product TO 'distribution_manager';
GRANT INSERT (DBatchNumber, DShippingDate, IssuedDMUserName, SalesAgentUSerName, DestinationShopID, DeliveryStatus) ON victa.distribution_process TO 'distribution_manager';
GRANT UPDATE (DBatchNumber, DShippingDate, IssuedDMUserName, SalesAgentUSerName, DestinationShopID, DeliveryStatus) ON victa.distribution_process TO 'distribution_manager';
GRANT SELECT, DELETE ON victa.distribution_process TO 'distribution_manager';
GRANT CREATE USER ON *.* TO 'distribution_manager';
GRANT ROLE_ADMIN ON *.* TO 'distribution_manager';
GRANT RELOAD ON *.* TO 'distribution_manager';
FLUSH PRIVILEGES;

GRANT INSERT (CourieredDate, CourieredDate, DeliveryStatus) ON victa.distribution_process TO 'sales_agent';
GRANT UPDATE (CourieredDate, CourieredDate, DeliveryStatus) ON victa.distribution_process TO 'sales_agent';
GRANT SELECT, DELETE ON victa.distribution_process TO 'sales_agent';
FLUSH PRIVILEGES;

SELECT User, Host FROM mysql.user;
DROP USER 'user1FM'@'localhost';
SHOW GRANTS FOR 'user1FM'@'localhost';
SHOW GRANTS FOR 'user1FM'@'localhost' USING 'factory_manager';
