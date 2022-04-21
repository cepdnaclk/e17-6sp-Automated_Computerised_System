DROP DATABASE IF EXISTS victa;
CREATE DATABASE victa;
USE victa;
-- DROP DATABASE victa;
CREATE TABLE product(
	ProductName VARCHAR(255) PRIMARY KEY,
    UnitPrice DECIMAL(10, 2)
);

CREATE TABLE factory_manager(
	UserName VARCHAR(255) PRIMARY KEY,
    PassWord VARCHAR(255),
    Name VARCHAR(255),
    Contact VARCHAR(20)
);

CREATE TABLE distribution_manager(
	UserName VARCHAR(255) PRIMARY KEY,
    PassWord VARCHAR(255),
    Name VARCHAR(255),
    Contact VARCHAR(20)
);

CREATE TABLE sales_agent(
	UserName VARCHAR(255) PRIMARY KEY,
    PassWord VARCHAR(255),
    Name VARCHAR(255),
    Contact VARCHAR(20)
);

CREATE TABLE factory_product(
	BatchNumber VARCHAR(30) PRIMARY KEY,
    ProductDate DATE,
    Quantity DECIMAL,
    CurrentQuantity DECIMAL,
    FactoryProductName VARCHAR(255),
    EnteredFMUserName VARCHAR(255),
    FOREIGN KEY (FactoryProductName) REFERENCES product(ProductName),
    FOREIGN KEY (EnteredFMUserName) REFERENCES factory_manager(UserName)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE issued_product(
	BatchNumber VARCHAR(30) PRIMARY KEY,
    IssuedDate DATE,
    IssuedQuantity DECIMAL,
    CurrentQuantity DECIMAL,
    IssuedProductName VARCHAR(255),
    IssuedFMUserName VARCHAR(255),
    ReceivedQuantity DECIMAL,
    CheckedDMUserName VARCHAR(255),
    ValidRecord BOOL,
    FOREIGN KEY (IssuedProductName) REFERENCES product(ProductName),
    FOREIGN KEY (IssuedFMUserName) REFERENCES factory_manager(UserName),
    FOREIGN KEY (CheckedDMUserName) REFERENCES distribution_manager(UserName)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE distributed_product(
	ShippingDate DATE,
    BatchNumber VARCHAR(30),
    AssignedQuantity DECIMAL,
    DistributedProductName VARCHAR(255),
    PRIMARY KEY(ShippingDate, BatchNumber),
	FOREIGN KEY (DistributedProductName) REFERENCES product(ProductName)
	ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE shop(
	ShopID VARCHAR(30) PRIMARY KEY,
    Name VARCHAR(255),
    Location VARCHAR(255),
    Contact VARCHAR(20)
);

CREATE TABLE distribution_process(
	BatchNumber VARCHAR(30),
    ShippingDate DATE,
    IssuedDMUserName VARCHAR(255),
    SalesAgentUserName VARCHAR(255),
    DestinationShopID VARCHAR(30),
    CourieredDate DATE,
    CourieredQuantity DECIMAL,
    DelivaryStatus VARCHAR(255),
    ValidRecord BOOL,
	PRIMARY KEY(BatchNumber, ShippingDate, IssuedDMUserName, SalesAgentUserName, DestinationShopID),
    FOREIGN KEY (BatchNumber, ShippingDate) REFERENCES distributed_product(BatchNumber, ShippingDate),
    FOREIGN KEY (IssuedDMUserName) REFERENCES distribution_manager(UserName), 
    FOREIGN KEY (SalesAgentUserName) REFERENCES sales_agent(UserName), 
    FOREIGN KEY (DestinationShopID) REFERENCES shop(ShopID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);




