DROP ROLE IF EXISTS 'factory_manager', 'distribution_manager', 'sales_agent';
CREATE ROLE 'factory_manager', 'distribution_manager', 'sales_agent';

GRANT SELECT, INSERT, UPDATE, DELETE ON victa.product TO 'factory_manager';
GRANT SELECT ON victa.factory_manager TO 'factory_manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON victa.factory_product TO 'factory_manager';
GRANT SELECT ON victa.issued_product TO 'factory_manager';

FLUSH PRIVILEGES;

GRANT SELECT, INSERT, UPDATE, DELETE ON victa.issued_product TO 'distribution_manager';
GRANT SELECT ON victa.distribution_manager TO 'distribution_manager';
GRANT INSERT, UPDATE
	(DistributionOrderId, BatchNumber, Quantity, 
    IssuedDMUserName, SalesAgentUserName, DestinedShopId) 
    ON victa.distributed_product TO 'distribution_manager';
GRANT SELECT, DELETE ON victa.distributed_product TO 'distribution_manager';

FLUSH PRIVILEGES;

GRANT INSERT, UPDATE (DeliveredQuantity, DelivaryStatus) ON victa.distributed_product TO 'sales_agent';
GRANT SELECT ON victa.sales_agent TO 'sales_agent';
GRANT SELECT ON victa.distributed_product TO 'sales_agent';

FLUSH PRIVILEGES;