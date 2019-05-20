/*
 Navicat Premium Data Transfer

 Source Server         : LBJames
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : localhost:3306
 Source Schema         : yiguo

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : 65001

 Date: 19/05/2019 18:26:36
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car`  (
  `gid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `gimg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ginfo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gprice` decimal(10, 2) NULL DEFAULT NULL,
  `quantity` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sumprice` decimal(50, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`gid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of car
-- ----------------------------
INSERT INTO `car` VALUES (3, '../img/listimg/3.jpg', '泰国山竹1kg/盒/个', 89.00, '5', 445.00);
INSERT INTO `car` VALUES (4, '../img/listimg/4.jpg', 'SunMoon能量STAR墨西哥牛油果2个180g以上/个/个', 29.00, '1', 29.00);
INSERT INTO `car` VALUES (2, '../img/listimg/2.jpg', '新西兰红玫瑰Rose苹果6个210g以上/个/个', 59.90, '1', 59.90);

-- ----------------------------
-- Table structure for listinf
-- ----------------------------
DROP TABLE IF EXISTS `listinf`;
CREATE TABLE `listinf`  (
  `gid` int(100) UNSIGNED NOT NULL AUTO_INCREMENT,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ginfo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gprice` decimal(10, 2) NULL DEFAULT NULL,
  `gdescribe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dimg1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dimg2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dimg3` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`gid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 38 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of listinf
-- ----------------------------
INSERT INTO `listinf` VALUES (1, '../img/listimg/1.jpg', '新奇士美国晚季脐橙10个200g以上/个', 99.00, '果肉细腻 酸甜适度', '../img/detailimg/d1_1.jpg', '../img/detailimg/d1_2.jpg', '../img/detailimg/d1_3.jpg');
INSERT INTO `listinf` VALUES (2, '../img/listimg/2.jpg', '新西兰红玫瑰Rose苹果6个210g以上/个', 59.90, '颜色红润，个大饱满', '../img/detailimg/d2_1.jpg', '../img/detailimg/d2_2.jpg', '../img/detailimg/d2_3.jpg');
INSERT INTO `listinf` VALUES (3, '../img/listimg/3.jpg', '泰国山竹1kg/盒', 89.00, '果肉雪白，清香甜蜜', '../img/detailimg/d3_1.jpg', '../img/detailimg/d3_2.jpg', '../img/detailimg/d3_3.jpg');
INSERT INTO `listinf` VALUES (4, '../img/listimg/4.jpg', 'SunMoon能量STAR墨西哥牛油果2个180g以上/个', 29.00, '幸福之果 淡淡乳脂香', '../img/detailimg/d4_1.jpg', '../img/detailimg/d4_2.jpg', '../img/detailimg/d4_3.jpg');
INSERT INTO `listinf` VALUES (5, '../img/listimg/5.jpg', '新西兰嘎啦果苹果6个190g以上/个', 46.00, '肉质致密、口味酸甜', '../img/detailimg/d5_1.jpg', '../img/detailimg/d5_2.jpg', '../img/detailimg/d5_3.jpg');
INSERT INTO `listinf` VALUES (6, '../img/listimg/6.jpg', '智利红提500g/盒', 25.90, '颗粒饱满 脆甜果肉', '../img/detailimg/d6_1.jpg', '../img/detailimg/d6_2.jpg', '../img/detailimg/d6_3.jpg');
INSERT INTO `listinf` VALUES (7, '../img/listimg/7.jpg', '泰国金枕头巴掌榴莲1个1.25-1.75kg/个', 129.90, '单品不合单 预计下单72小时配送', '../img/detailimg/d8_1.jpg', '../img/detailimg/d8_2.jpg', '../img/detailimg/d8_3.jpg');
INSERT INTO `listinf` VALUES (8, '../img/listimg/8.jpg', '新西兰微风苹果6个210g以上/个', 69.90, '颜色红润，果肉紧实', '../img/detailimg/d9_1.jpg', '../img/detailimg/d9_2.jpg', '../img/detailimg/d9_3.jpg');
INSERT INTO `listinf` VALUES (9, '../img/listimg/9.jpg', '越南红心火龙果5个410g以上/个(大果)', 139.00, '嫩滑多汁 清甜回味', '../img/detailimg/d101.jpg', '../img/detailimg/d102.jpg', '../img/detailimg/d103.jpg');
INSERT INTO `listinf` VALUES (10, '../img/listimg/10.jpg', '新奇士美国晚季脐橙12个约150g/个(黑标)', 99.00, '新奇士出品，黑标脐橙', '../img/detailimg/d111.jpg', '../img/detailimg/d112.jpg', '../img/detailimg/d113.jpg');
INSERT INTO `listinf` VALUES (11, '../img/listimg/11.jpg', '荷兰青啤梨4个(180g以上/个)', 34.80, '软硬皆宜，香气宜人', '../img/detailimg/d121.jpg', '../img/detailimg/d122.jpg', '../img/detailimg/d123.jpg');
INSERT INTO `listinf` VALUES (12, '../img/listimg/12.jpg', '澳大利亚无籽红提500g/盒', 39.90, '晶莹剔透 紧实甜脆', '../img/detailimg/d141.jpg', '../img/detailimg/d142.jpg', '../img/detailimg/d143.jpg');
INSERT INTO `listinf` VALUES (13, '../img/listimg/13.jpg', '埃及橙10个260g以上/个', 49.00, '酸中带甜 榨汁能手', '../img/detailimg/d151.jpg', '../img/detailimg/d152.jpg', '../img/detailimg/d153.jpg');
INSERT INTO `listinf` VALUES (14, '../img/listimg/14.jpg', '美国红蛇果6个180g以上/个', 39.00, '果味浓郁，汁水满溢', '../img/detailimg/d161.jpg', '../img/detailimg/d162.jpg', '../img/detailimg/d163.jpg');
INSERT INTO `listinf` VALUES (15, '../img/listimg/15.jpg', 'Zespri佳沛新西兰阳光金奇异果3.3kg原箱27-30个', 288.00, '全家的维C小甜心', '../img/detailimg/d171.jpg', '../img/detailimg/d172.jpg', '../img/detailimg/d173.jpg');
INSERT INTO `listinf` VALUES (16, '../img/listimg/16.jpg', '越南白心火龙果2个450g以上/个(大果)', 27.90, '果肉丰满，甜蜜多汁，清香扑鼻', '../img/detailimg/d181.jpg', '../img/detailimg/d182.jpg', '../img/detailimg/d183.jpg');
INSERT INTO `listinf` VALUES (17, '../img/listimg/17.jpg', 'Zespri新西兰绿奇异果3.3kg原箱(25-27个)', 179.00, 'Zespri品牌 酸甜适口', '../img/detailimg/d191.jpg', '../img/detailimg/d192.jpg', '../img/detailimg/d193.jpg');
INSERT INTO `listinf` VALUES (18, '../img/listimg/18.jpg', '澳大利亚Moon Drop’s无籽黑提500g/盒', 49.90, '月亮之泪，口味纯正，皮薄肉厚', '../img/detailimg/d201.jpg', '../img/detailimg/d202.jpg', '../img/detailimg/d203.jpg');
INSERT INTO `listinf` VALUES (19, '../img/listimg/19.jpg', '越南红心火龙果2个410g以上/个(大果)', 59.00, '嫩滑多汁 清甜回味', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (20, '../img/listimg/20.jpg', '泰国精选椰青9个原箱', 138.00, '低糖低卡 满满电解质', '../img/detailimg/d221.jpg', '../img/detailimg/d222.jpg', '../img/detailimg/d223.jpg');
INSERT INTO `listinf` VALUES (21, '../img/listimg/21.jpg', 'Zespri佳沛新西兰阳光金奇异果6个(114-134g/个)', 78.00, '软糯香甜 一口甜蜜滋味', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (22, '../img/listimg/22.jpg', '菲律宾凤梨2个1kg以上/个', 45.90, '脆嫩多汁，削皮即食', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (23, '../img/listimg/23.jpg', '智利青苹果4个130g以上/个', 33.90, '清新酸甜 一咬嘎嘣脆', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (24, '../img/listimg/24.jpg', '西班牙晚季脐橙10个270g以上/个', 79.00, '皮薄渣少，汁水丰腴', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (25, '../img/listimg/25.jpg', '菲律宾凤梨1个1kg以上/个', 35.90, '脆嫩多汁，削皮即食', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (26, '../img/listimg/26.jpg', '泰国精选椰青4个原箱', 68.00, '低糖低卡 满满电解质', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (27, '../img/listimg/27.jpg', '以色列西柚6个320g以上/个', 99.00, '榨汁调饮 满口柚香', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (28, '../img/listimg/28.jpg', 'Zespri新西兰绿奇异果3.3kg原箱(30-33个)', 179.00, 'Zespri品牌 清甜爽口好滋味', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (29, '../img/listimg/29.jpg', 'SunMoon泰国金枕头冷冻榴莲果肉300g', 49.90, '就像现剥的榴莲肉一样绵糯香甜', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (30, '../img/listimg/30.jpg', '比利时啤梨4个180g以上/个', 32.90, '吃软不吃硬 梨界软妹子', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (31, '../img/listimg/31.jpg', 'SunMoon能量STAR墨西哥牛油果4个130g以上/个', 49.90, '幸福之果 淡淡乳脂香', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (32, '../img/listimg/32.jpg', 'Mr APPLE新西兰红玫瑰Queen苹果6个(150g以上/个)', 59.90, '淡淡玫瑰香 紧实清脆', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (33, '../img/listimg/33.jpg', '常瀛进口精选香蕉约1.5kg', 29.90, '常瀛进口精选香蕉约1.5kg', '../img/detailimg/d331.jpg', '../img/detailimg/d332.jpg', '../img/detailimg/d333.jpg');
INSERT INTO `listinf` VALUES (34, '../img/listimg/34.jpg', '常瀛进口香蕉6根(单根袋装)', 25.00, '常瀛进口香蕉6根(单根袋装)', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (35, '../img/listimg/35.jpg', '常瀛进口吖蜜芝麻蕉1kg', 25.90, '满脸雀斑，甜心软妹纸，一口吖蜜', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (36, '../img/listimg/36.jpg', '常瀛进口整把香蕉约1.36kg', 39.90, '小巧玲珑，甜糯小黄人', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');
INSERT INTO `listinf` VALUES (37, '../img/listimg/37.jpg', 'espri佳沛新西兰阳光金奇异果3.3kg原箱(22-25个)', 298.00, '巨无霸金果 软糯香甜', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg', '../img/detailimg/timg.jpg');

-- ----------------------------
-- Table structure for userinf
-- ----------------------------
DROP TABLE IF EXISTS `userinf`;
CREATE TABLE `userinf`  (
  `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pwd` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reg_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinf
-- ----------------------------
INSERT INTO `userinf` VALUES (1, 'cxk123', '123456', '2019-05-13 16:59:14');
INSERT INTO `userinf` VALUES (2, 'wxj123', '654321', '2019-05-14 09:17:30');
INSERT INTO `userinf` VALUES (21, '13664936981', 'fjj123', '2019-05-18 19:32:09');
INSERT INTO `userinf` VALUES (20, '1471262797@qq.com', 'asd123', '2019-05-14 11:40:53');
INSERT INTO `userinf` VALUES (19, '13536658527', 'qqq111', '2019-05-14 10:12:57');

SET FOREIGN_KEY_CHECKS = 1;
