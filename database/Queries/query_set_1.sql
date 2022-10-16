-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema victa
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema victa
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `victa` DEFAULT CHARACTER SET utf8 ;
USE `victa` ;

-- -----------------------------------------------------
-- Table `victa`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `victa`.`product` (
  `ProductName` VARCHAR(50) NOT NULL,
  `UnitPrice` DECIMAL(8,2) NULL,
  PRIMARY KEY (`ProductName`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `victa`.`factory_manager`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `victa`.`factory_manager` (
  `UserName` VARCHAR(20) NOT NULL,
  `Password` VARCHAR(20) NULL,
  `Name` VARCHAR(50) NULL,
  `Contact` VARCHAR(12) NULL,
  PRIMARY KEY (`UserName`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `victa`.`factory_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `victa`.`factory_product` (
  `BatchNumber` VARCHAR(15) NOT NULL,
  `ProductDate` DATETIME NULL,
  `FactoryProductName` VARCHAR(50) NOT NULL,
  `Quantity` INT NULL,
  `EnteredFMUserName` VARCHAR(20) NOT NULL,
  `IsIssued` TINYINT NULL DEFAULT 0,
  `IssuedFMUserName` VARCHAR(20) NULL,
  PRIMARY KEY (`BatchNumber`),
  INDEX `fk_factory_product_product_idx` (`FactoryProductName` ASC) VISIBLE,
  INDEX `fk_factory_product_factory_manager1_idx` (`EnteredFMUserName` ASC) VISIBLE,
  INDEX `fk_factory_product_factory_manager2_idx` (`IssuedFMUserName` ASC) VISIBLE,
  CONSTRAINT `fk_factory_product_product`
    FOREIGN KEY (`FactoryProductName`)
    REFERENCES `victa`.`product` (`ProductName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_factory_product_factory_manager1`
    FOREIGN KEY (`EnteredFMUserName`)
    REFERENCES `victa`.`factory_manager` (`UserName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_factory_product_factory_manager2`
    FOREIGN KEY (`IssuedFMUserName`)
    REFERENCES `victa`.`factory_manager` (`UserName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `victa`.`distribution_manager`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `victa`.`distribution_manager` (
  `UserName` VARCHAR(20) NOT NULL,
  `Password` VARCHAR(20) NULL,
  `Name` VARCHAR(50) NULL,
  `Contact` VARCHAR(12) NULL,
  PRIMARY KEY (`UserName`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `victa`.`sales_agent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `victa`.`sales_agent` (
  `UserName` VARCHAR(20) NOT NULL,
  `Password` VARCHAR(20) NULL,
  `Name` VARCHAR(50) NULL,
  `Contact` VARCHAR(12) NULL,
  PRIMARY KEY (`UserName`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `victa`.`issued_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `victa`.`issued_product` (
  `BatchNumber` VARCHAR(15) NOT NULL,
  `StoredDate` DATETIME NULL,
  `StoredQuantity` INT NULL,
  `CheckedDMUserName` VARCHAR(20) NOT NULL,
  `Note` VARCHAR(50) NULL,
  `ReceivingStatus` TINYINT NULL DEFAULT 0,
  `CurrentQuantity` INT NULL,
  PRIMARY KEY (`BatchNumber`),
  INDEX `fk_issued_product_distribution_manager1_idx` (`CheckedDMUserName` ASC) VISIBLE,
  CONSTRAINT `fk_issued_product_distribution_manager1`
    FOREIGN KEY (`CheckedDMUserName`)
    REFERENCES `victa`.`distribution_manager` (`UserName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `victa`.`shop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `victa`.`shop` (
  `ShopName` VARCHAR(50) NOT NULL,
  `Address` VARCHAR(100) NULL,
  `Contact` VARCHAR(12) NULL,
  PRIMARY KEY (`ShopName`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `victa`.`distributed_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `victa`.`distributed_product` (
  `DistributionOrderId` INT NOT NULL AUTO_INCREMENT,
  `BatchNumber` VARCHAR(15) NULL,
  `Quantity` INT NULL,
  `IssuedDMUserName` VARCHAR(20) NOT NULL,
  `SalesAgentUserName` VARCHAR(20) NOT NULL,
  `DestinedShopName` VARCHAR(50) NOT NULL,
  `DeliveredQuantity` INT NULL,
  `DeliveryStatus` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`DistributionOrderId`),
  INDEX `fk_distributed_product_distribution_manager1_idx` (`IssuedDMUserName` ASC) VISIBLE,
  INDEX `fk_distributed_product_sales_agent1_idx` (`SalesAgentUserName` ASC) VISIBLE,
  INDEX `fk_distributed_product_shop1_idx` (`DestinedShopName` ASC) VISIBLE,
  CONSTRAINT `fk_distributed_product_distribution_manager1`
    FOREIGN KEY (`IssuedDMUserName`)
    REFERENCES `victa`.`distribution_manager` (`UserName`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_distributed_product_sales_agent1`
    FOREIGN KEY (`SalesAgentUserName`)
    REFERENCES `victa`.`sales_agent` (`UserName`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_distributed_product_shop1`
    FOREIGN KEY (`DestinedShopName`)
    REFERENCES `victa`.`shop` (`ShopName`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `victa`.`manager`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `victa`.`manager` (
  `UserName` VARCHAR(20) NOT NULL,
  `Password` VARCHAR(20) NULL,
  `Name` VARCHAR(50) NULL,
  `Contact` VARCHAR(12) NULL,
  PRIMARY KEY (`UserName`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
