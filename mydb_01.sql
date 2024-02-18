/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80035
 Source Host           : localhost:3306
 Source Schema         : mydb_01

 Target Server Type    : MySQL
 Target Server Version : 80035
 File Encoding         : 65001

 Date: 18/02/2024 11:24:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ev_article_cate
-- ----------------------------
DROP TABLE IF EXISTS `ev_article_cate`;
CREATE TABLE `ev_article_cate`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ev_article_cate
-- ----------------------------
INSERT INTO `ev_article_cate` VALUES (1, '科技', 'technology');
INSERT INTO `ev_article_cate` VALUES (2, '历史', 'history');
INSERT INTO `ev_article_cate` VALUES (3, '物理', 'WuLi');
INSERT INTO `ev_article_cate` VALUES (5, '英语', 'English');
INSERT INTO `ev_article_cate` VALUES (6, '语文', 'Chinese');
INSERT INTO `ev_article_cate` VALUES (7, '数学', 'Math');
INSERT INTO `ev_article_cate` VALUES (8, '地理', 'Geography');
INSERT INTO `ev_article_cate` VALUES (9, '生物', 'Organism');

-- ----------------------------
-- Table structure for ev_articles
-- ----------------------------
DROP TABLE IF EXISTS `ev_articles`;
CREATE TABLE `ev_articles`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pub_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `state` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cate_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `author_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ev_articles
-- ----------------------------
INSERT INTO `ev_articles` VALUES (4, '英语之家', '', '2024-01-15 20:34:19.553', '已发布', '5', 5);
INSERT INTO `ev_articles` VALUES (5, '物理之家', '<p>麦克斯韦方程组</p>', '2024-01-15 20:35:08.256', '已发布', '3', 5);
INSERT INTO `ev_articles` VALUES (6, '生物之家', '<p>你好，生物</p>', '2024-01-15 20:38:59.042', '已发布', '9', 5);
INSERT INTO `ev_articles` VALUES (7, '地理之家', '<p>你好世界</p>', '2024-01-15 20:49:35.842', '已发布', '8', 5);

-- ----------------------------
-- Table structure for ev_users
-- ----------------------------
DROP TABLE IF EXISTS `ev_users`;
CREATE TABLE `ev_users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_pic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ev_users
-- ----------------------------
INSERT INTO `ev_users` VALUES (2, 'white', '$2a$10$tv..eqeMpePUa4W6GOwiOuazwnzB4mY4QPqKBAChYyn0b2JZTZ6mq', 'srd', '1020572432@qq.com', NULL);
INSERT INTO `ev_users` VALUES (4, 'whitesrd', '$2a$10$d2KMKoias9r.maOUZ6S6huCzu.ltttvnXJRb1VH.rMRYjssx4hApK', NULL, NULL, 'data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=');
INSERT INTO `ev_users` VALUES (5, 'adong123', '$2a$10$Sj9WYWKjOZ4Gg1oKOdKfZOvgsX8vrgCR84NfOMe6TQcYM2A951QPq', NULL, NULL, NULL);
INSERT INTO `ev_users` VALUES (6, 'white1020', '$2a$10$DGAvZB4XNtgNGLJBHuoPZu1mP9/.4Lkfr6t5qz7Yj6jtZduAUGDCm', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL,
  `no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `age` int(0) NULL DEFAULT NULL,
  `sex` int(0) NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `role_id` int(0) NULL DEFAULT NULL,
  `is_valid` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'white', '沈仁东', '1020572432', 20, 1, '19720921981', 1, '0');

SET FOREIGN_KEY_CHECKS = 1;
