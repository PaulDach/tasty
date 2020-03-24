
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  `restaurantId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_085156de3c3a44eba017a6a0846` (`restaurantId`),
  CONSTRAINT `FK_085156de3c3a44eba017a6a0846` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for menu_products_product
-- ----------------------------
DROP TABLE IF EXISTS `menu_products_product`;
CREATE TABLE `menu_products_product` (
  `menuId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`menuId`,`productId`),
  KEY `IDX_1e70a77e10f78c8f6467c474b9` (`menuId`),
  KEY `IDX_e76cd16a8f74829af3d0de7385` (`productId`),
  CONSTRAINT `FK_e76cd16a8f74829af3d0de73854` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_1e70a77e10f78c8f6467c474b9f` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `canChooseSide` tinyint(4) NOT NULL DEFAULT '0',
  `canChooseCooking` tinyint(4) NOT NULL DEFAULT '0',
  `type` enum('0','1','2','3') NOT NULL DEFAULT '3',
  `price` int(11) NOT NULL DEFAULT '0',
  `restaurantId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3249a5709fb37437198f7dff801` (`restaurantId`),
  CONSTRAINT `FK_3249a5709fb37437198f7dff801` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for product_sides_side
-- ----------------------------
DROP TABLE IF EXISTS `product_sides_side`;
CREATE TABLE `product_sides_side` (
  `productId` int(11) NOT NULL,
  `sideId` int(11) NOT NULL,
  PRIMARY KEY (`productId`,`sideId`),
  KEY `IDX_a4a86f5e239f4280d65bf8bbf3` (`productId`),
  KEY `IDX_4e19de724fb66ca632faf18e1e` (`sideId`),
  CONSTRAINT `FK_4e19de724fb66ca632faf18e1ec` FOREIGN KEY (`sideId`) REFERENCES `side` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_a4a86f5e239f4280d65bf8bbf36` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for restaurant
-- ----------------------------
DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for side
-- ----------------------------
DROP TABLE IF EXISTS `side`;
CREATE TABLE `side` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `markup` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
