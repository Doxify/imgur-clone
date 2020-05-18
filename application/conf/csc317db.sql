-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_postid` int NOT NULL,
  `fk_userid` int NOT NULL,
  `text` varchar(4096) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_postid_idx` (`fk_postid`),
  KEY `fk_userid_idx` (`fk_userid`),
  CONSTRAINT `fk_postid` FOREIGN KEY (`fk_postid`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userid` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,26,11,'This is a test comment','2020-05-14 14:58:23'),(2,26,11,'Leaving another comment to see how this works!','2020-05-14 17:11:09'),(3,26,11,'Leaving yet another comment famo!','2020-05-14 17:14:10'),(4,26,11,'Leaving yet another comment famo!','2020-05-14 17:15:02'),(5,26,11,'this is yet another comment lmaoo','2020-05-14 17:15:17'),(6,26,11,'comments work','2020-05-14 17:15:45'),(7,26,11,'comments work','2020-05-14 17:15:49'),(8,26,11,'comments work','2020-05-14 17:15:50'),(9,26,11,'comments work','2020-05-14 17:15:51'),(10,26,11,'comments work','2020-05-14 17:15:51'),(11,26,11,'comments work','2020-05-14 17:15:51'),(12,26,11,'comments work','2020-05-14 17:15:51'),(13,26,11,'comments work','2020-05-14 17:15:51'),(14,26,11,'comments work','2020-05-14 17:15:51'),(15,26,11,'comments work','2020-05-14 17:15:52'),(16,26,11,'comments work','2020-05-14 17:15:52'),(17,26,11,'comments work','2020-05-14 17:15:52'),(18,26,11,'comments work','2020-05-14 17:15:52'),(19,26,11,'comments work','2020-05-14 17:15:52'),(20,26,11,'comments work','2020-05-14 17:15:53'),(21,26,11,'comments work','2020-05-14 17:15:53'),(22,26,11,'comments work','2020-05-14 17:15:53'),(23,26,11,'comments work','2020-05-14 17:15:53'),(24,26,11,'Testing if comments work or not?','2020-05-14 17:22:13'),(25,26,11,'Testing if comments work or not?c2','2020-05-14 17:23:08'),(26,26,11,'Testing if comments work or not?c2333','2020-05-14 17:24:35'),(27,19,11,'Bro she def did it.','2020-05-14 17:25:36'),(28,19,11,'Bro she def did it. I think so','2020-05-14 17:26:04'),(29,19,11,'Tiger KING FOREVER!!!!','2020-05-14 17:27:49'),(30,19,11,'no way, she did not do it!','2020-05-14 17:35:05'),(31,19,11,'no way, she did not do it!fdadawdawd','2020-05-14 17:36:04'),(32,20,11,'Nice bank account dude!','2020-05-14 17:40:58'),(33,19,11,'carolina','2020-05-14 17:43:20'),(34,25,11,'woah is that me','2020-05-14 17:45:00'),(35,25,11,'turns out its me       ','2020-05-14 17:45:31'),(36,26,11,'nice spelling bro','2020-05-14 17:48:45'),(37,26,11,'testing!! BRRR','2020-05-14 18:17:36'),(38,26,11,'wooooo','2020-05-14 18:17:44'),(39,17,11,'nice moon','2020-05-14 18:23:37'),(40,28,11,'i comment man\n','2020-05-14 18:42:49'),(41,26,11,'audrey is cute','2020-05-14 19:26:02'),(42,24,11,'hey i like this keyboard!\nI don\'t know how to type tho!\n','2020-05-14 19:28:35'),(43,28,11,'nice bro','2020-05-14 21:06:55'),(44,29,11,'very nice comment bro','2020-05-14 21:13:59'),(45,28,11,'wwwoah','2020-05-14 22:42:12'),(46,18,11,'test','2020-05-15 16:00:00'),(47,19,11,'FAKE','2020-05-15 16:01:51'),(48,30,11,'W','2020-05-15 16:28:09'),(49,35,11,'tweetle tweetle','2020-05-15 16:39:30'),(50,31,10,'woah','2020-05-15 16:42:58'),(51,28,10,'www','2020-05-15 16:43:08'),(52,35,16,'did account crete work?','2020-05-15 17:02:56'),(53,35,16,'www','2020-05-15 17:03:37'),(54,35,16,'www','2020-05-15 17:05:15'),(55,30,16,'Comments work after MVC?','2020-05-15 18:14:06'),(56,30,16,'WWW','2020-05-15 18:14:11'),(57,31,11,'crypto twitter in shambles','2020-05-15 21:58:53'),(58,31,11,'leaving a commenty\n','2020-05-17 11:16:54'),(59,38,17,'hmmm','2020-05-17 12:09:15'),(60,33,17,'???','2020-05-17 12:26:20'),(61,38,11,'agreed with op','2020-05-17 13:15:20'),(62,39,11,'UHHHHHHH OKAY','2020-05-17 13:28:29'),(63,26,11,'nice!','2020-05-17 13:30:31'),(64,39,18,'test','2020-05-17 15:45:21'),(65,39,18,'test','2020-05-17 15:59:38'),(66,35,18,'yes sir','2020-05-17 16:00:04'),(67,35,18,'comments okay\n','2020-05-17 16:00:27'),(68,40,11,'comments','2020-05-17 21:42:49'),(69,41,11,'BRRRRRRRR','2020-05-17 22:00:39'),(70,18,11,'wow description is amazing, so inspirational','2020-05-17 22:03:35'),(71,42,19,'Nice post man','2020-05-18 15:18:46');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  `views` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (5,'5k moon image','This is a moon picture.','public/images/uploads/7fc511d85a41637d4246a481793a3a715357d9dace9d.jpeg','public/images/uploads/thumbnail-7fc511d85a41637d4246a481793a3a715357d9dace9d.jpeg',0,'2020-05-12 10:17:54',11,1),(6,'test','test','public/images/uploads/b16c67fed3d5204909e83fa2c401db5d4415afd50f95.jpeg','public/images/uploads/thumbnail-b16c67fed3d5204909e83fa2c401db5d4415afd50f95.jpeg',0,'2020-05-12 10:47:09',11,13),(7,'test','test','public/images/uploads/6a6f706902e0a5ab3736becdbb71ab6afe0957787d5d.jpeg','public/images/uploads/thumbnail-6a6f706902e0a5ab3736becdbb71ab6afe0957787d5d.jpeg',0,'2020-05-12 10:49:54',11,1),(8,'test','test','public/images/uploads/4d7bf4374ffbd26491476151d2d7d69bd172d248e816.jpeg','public/images/uploads/thumbnail-4d7bf4374ffbd26491476151d2d7d69bd172d248e816.jpeg',0,'2020-05-12 10:50:00',11,1),(9,'test','test','public/images/uploads/ec33df8be829cd12159c135e7c8f2552efdf5fd59f0c.jpeg','public/images/uploads/thumbnail-ec33df8be829cd12159c135e7c8f2552efdf5fd59f0c.jpeg',0,'2020-05-12 10:50:01',11,1),(10,'test','test','public/images/uploads/c7e05f8b51f42af8f6b8a64c4f3e312bee88576dbf82.jpeg','public/images/uploads/thumbnail-c7e05f8b51f42af8f6b8a64c4f3e312bee88576dbf82.jpeg',0,'2020-05-12 10:52:46',11,2),(11,'test','test','public/images/uploads/8c53eced72c29108d6538774e2b454cb35e602849357.jpeg','public/images/uploads/thumbnail-8c53eced72c29108d6538774e2b454cb35e602849357.jpeg',0,'2020-05-12 10:52:48',11,40),(12,'test','test','public/images/uploads/44102bba2080fee14c5befb4b46908e28992d039b432.jpeg','public/images/uploads/thumbnail-44102bba2080fee14c5befb4b46908e28992d039b432.jpeg',0,'2020-05-12 10:52:49',11,0),(13,'test','test','public/images/uploads/45dc1cbc5c2aca7c8aa42959566f1fc401aea5c2cc25.jpeg','public/images/uploads/thumbnail-45dc1cbc5c2aca7c8aa42959566f1fc401aea5c2cc25.jpeg',0,'2020-05-12 10:52:52',11,0),(14,'test','test','public/images/uploads/241b7202622efab04e0aa44cdea3dc0809db89f91d7f.jpeg','public/images/uploads/thumbnail-241b7202622efab04e0aa44cdea3dc0809db89f91d7f.jpeg',0,'2020-05-12 10:52:53',11,2),(15,'testset','testsetsetsets','public/images/uploads/f23875cd0136052f712ef1ecb93a9fad8ef911847d50.png','public/images/uploads/thumbnail-f23875cd0136052f712ef1ecb93a9fad8ef911847d50.png',0,'2020-05-12 14:28:59',11,2),(16,'testsetse','ttsetsetset','public/images/uploads/e37a2516855b62c9228937a43edbff325e22db311dd5.png','public/images/uploads/thumbnail-e37a2516855b62c9228937a43edbff325e22db311dd5.png',0,'2020-05-12 14:30:30',11,1),(17,'4k Moon','This was created in Adobe Photoshop, the moon landing was fake. reeeeeeeeeeeee','public/images/uploads/d8d062f15785cbdbdf776834a35826d7efa62d8297f0.jpeg','public/images/uploads/thumbnail-d8d062f15785cbdbdf776834a35826d7efa62d8297f0.jpeg',0,'2020-05-12 16:03:55',11,2),(18,'5k Moon','\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"\r\n','public/images/uploads/6a5530568f835689b16ac232cc2d44d093a2f8bb722f.jpeg','public/images/uploads/thumbnail-6a5530568f835689b16ac232cc2d44d093a2f8bb722f.jpeg',0,'2020-05-12 16:05:32',11,135),(19,'Carol Baskin','She killed him','public/images/uploads/17f3c78697cde144ad59a3b938e78634dc3819d9a2d6.png','public/images/uploads/thumbnail-17f3c78697cde144ad59a3b938e78634dc3819d9a2d6.png',0,'2020-05-12 16:09:15',11,65),(20,'Some random screenshot','Here\'s a random screenshot I found','public/images/uploads/9eb0cb15594e543971bed3f799e60e0c31ade004876e.png','public/images/uploads/thumbnail-9eb0cb15594e543971bed3f799e60e0c31ade004876e.png',0,'2020-05-12 16:12:29',11,23),(21,'rw3ergdbhfrgws','qafweftwsefsef','public/images/uploads/909b40d4f3a9793043578651e8f31c96999bd36d477d.png','public/images/uploads/thumbnail-909b40d4f3a9793043578651e8f31c96999bd36d477d.png',0,'2020-05-12 18:16:43',11,4),(22,'rw3ergdbhfrgws','qafweftwsefsef','public/images/uploads/c42d1ad8630bf8f5378f823f3242f0002f9303230da6.png','public/images/uploads/thumbnail-c42d1ad8630bf8f5378f823f3242f0002f9303230da6.png',0,'2020-05-12 18:17:01',11,1),(23,'rw3ergdbhfrgws','qafweftwsefsef','public/images/uploads/1969aa8c187674a3d7655a8994aeb2dc607ca4733798.png','public/images/uploads/thumbnail-1969aa8c187674a3d7655a8994aeb2dc607ca4733798.png',0,'2020-05-12 18:17:18',11,3),(24,'rw3ergdbhfrgws','qafweftwsefsef','public/images/uploads/ad3a014cd56d2fd8742ed11ae59e267569a76c78e3fc.png','public/images/uploads/thumbnail-ad3a014cd56d2fd8742ed11ae59e267569a76c78e3fc.png',0,'2020-05-12 18:19:12',11,12),(25,'This is a new post','Audrey is cutepie','public/images/uploads/761689b630f45f7c063f4266002bc53dc350cde16a2a.png','public/images/uploads/thumbnail-761689b630f45f7c063f4266002bc53dc350cde16a2a.png',0,'2020-05-13 23:33:53',11,34),(26,'Screenyshot','This is a screenshot of my desktop.','public/images/uploads/65e5476d422f6ebf8dcd46a1793413210b05437218f7.png','public/images/uploads/thumbnail-65e5476d422f6ebf8dcd46a1793413210b05437218f7.png',0,'2020-05-14 11:18:08',11,129),(27,'upload ception','need to test this route man','public/images/uploads/dd98664c06a26c070de19050c7806740c4cb8b8642da.png','public/images/uploads/thumbnail-dd98664c06a26c070de19050c7806740c4cb8b8642da.png',0,'2020-05-14 18:40:54',11,18),(28,'round 2','fight!','public/images/uploads/1752a11dac756e6e444c7deefa51f72c30653c1ccd2c.png','public/images/uploads/thumbnail-1752a11dac756e6e444c7deefa51f72c30653c1ccd2c.png',0,'2020-05-14 18:42:28',11,55),(29,'title','This is a description','public/images/uploads/2c6923ccca81e2ac41139e92d99143ad58a3fa06b57f.png','public/images/uploads/thumbnail-2c6923ccca81e2ac41139e92d99143ad58a3fa06b57f.png',0,'2020-05-14 21:13:32',11,10),(30,'Testing upload','Does uploading a photo work after doing MVC? Let\'s find out...','public/images/uploads/be1b56f2d04de27b7ff243b66523e3effb5f9a599a58.png','public/images/uploads/thumbnail-be1b56f2d04de27b7ff243b66523e3effb5f9a599a58.png',0,'2020-05-15 16:27:16',11,13),(31,'test23','test2','public/images/uploads/360618b9d7e91d866caedf64ab16cc542fc3157339c0.png','public/images/uploads/thumbnail-360618b9d7e91d866caedf64ab16cc542fc3157339c0.png',0,'2020-05-15 16:29:22',11,4),(32,'ttt','amg','public/images/uploads/fa213fe50311412a8d9f785841f888de4e6526eafc83.png','public/images/uploads/thumbnail-fa213fe50311412a8d9f785841f888de4e6526eafc83.png',0,'2020-05-15 16:31:48',11,5),(33,'aaaa','aaa','public/images/uploads/2b3bb1f9344a4ed328215d1dc15497c472d16d5631de.jpeg','public/images/uploads/thumbnail-2b3bb1f9344a4ed328215d1dc15497c472d16d5631de.jpeg',0,'2020-05-15 16:32:54',11,16),(34,'b','b','public/images/uploads/cb026296a0e547cad6ee0ac0aedc2570237a7ecc6df3.png','public/images/uploads/thumbnail-cb026296a0e547cad6ee0ac0aedc2570237a7ecc6df3.png',0,'2020-05-15 16:34:54',11,7),(35,'working','working man','public/images/uploads/4541f2aaca509faa0efa3438dd98019e1af4192c50c4.png','public/images/uploads/thumbnail-4541f2aaca509faa0efa3438dd98019e1af4192c50c4.png',0,'2020-05-15 16:39:23',11,48),(36,'new user post','testing','public/images/uploads/b009a3a230f5a54a66bdc0d8c11d4999e45c7c126018.png','public/images/uploads/thumbnail-b009a3a230f5a54a66bdc0d8c11d4999e45c7c126018.png',0,'2020-05-15 22:59:11',14,11),(37,'testttt','test321','public/images/uploads/ed00d8b5a3c59585d0e61a46743bfddf881612d46394.png','public/images/uploads/thumbnail-ed00d8b5a3c59585d0e61a46743bfddf881612d46394.png',0,'2020-05-16 00:27:27',11,27),(38,'Website Ception','yes','public/images/uploads/615ca2fe8910e5f343d5568e5ad4ff005ef2f59e320a.png','public/images/uploads/thumbnail-615ca2fe8910e5f343d5568e5ad4ff005ef2f59e320a.png',0,'2020-05-17 12:07:31',17,18),(39,'can i upload gifs??','lets see','public/images/uploads/e67608c5ce3ad9120745db68a25f27757aad1c767860.gif','public/images/uploads/thumbnail-e67608c5ce3ad9120745db68a25f27757aad1c767860.gif',0,'2020-05-17 13:28:08',11,43),(40,'Image only test','testing testing testing','public/images/uploads/621d102ad35555cf2ca4a1a81e936c095ec51d4b9e70.png','public/images/uploads/thumbnail-621d102ad35555cf2ca4a1a81e936c095ec51d4b9e70.png',0,'2020-05-17 20:02:41',11,6),(41,'Mime type validation','Does it work?','public/images/uploads/2d09726862f1d2180f90530495979c898000b2397e68.png','public/images/uploads/thumbnail-2d09726862f1d2180f90530495979c898000b2397e68.png',0,'2020-05-17 21:59:08',11,13),(42,'Post Validation Test','Just testing validation...','public/images/uploads/4b1c580f1ef40b57162c104bda5fa6c345578f4e9a38.png','public/images/uploads/thumbnail-4b1c580f1ef40b57162c104bda5fa6c345578f4e9a38.png',0,'2020-05-18 15:10:21',17,3);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `type` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'doxify','ageorgescu@mail.sfsu.edu','$2b$10$mfNvT1MP/r2MAvK.0gXtteKTyTCeI5GXaL1cMtMmfVqZ7EjDEETUG',0,0,'2020-04-20 17:02:27'),(11,'test','test@test.com','$2b$10$6TA43cTpUj0j72GTWwTvOO75WblDQkORI3Qnpeosw4NvUJd1OpTDy',0,0,'2020-05-02 18:35:21'),(12,'uniqueUserman','unique@user.com','$2b$10$qGxkpcfcMWg5J7cWhWcymes/iv9y7Mh1ehXJUK/Us3j5LQmkF4Giy',0,0,'2020-05-02 18:39:01'),(14,'dox','dox@dox.com','$2b$10$NFOzfN1rq1/u1oG25fwlw.tpwrCQYl.IMocdyxmPiPPEoq2/tQZpq',0,0,'2020-05-15 16:46:37'),(15,'SFSU','sfsu@sfsu.edu','$2b$10$MdqsxgStjUw6WnFg7PCsKeI/sIfXI6nBv2vLfoBWucgjWXfXctAJe',0,0,'2020-05-15 16:59:15'),(16,'compsci','comp@sci.com','$2b$10$5TiCg34JVC0vx8vdoUDKmuYhkDA0MxIq2Djcrfc3.4jnyYkGEY4Gi',0,0,'2020-05-15 17:02:40'),(17,'letMeIn413Please','need@summer.credit','$2b$10$nA3glNw9zTq50lisQ6Set.ZL04SA9xFU6yt8h1Jo4Z/m.V3bfCJgi',0,0,'2020-05-17 12:06:37'),(18,'validator','ag@gmail.com','$2b$10$X0fyhWdvo2nyovxFEkltDe5cO0ghAzsPVKQfSx8e/diDFxDilm/PC',0,0,'2020-05-17 15:07:58'),(19,'letMeIn413Please!','test@test.comm','$2b$10$64rWMqMdRKCA7U9QyACff.m1XcQ192vUXwarwRnDUxVec2HwrYOx2',0,0,'2020-05-18 15:18:05');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-18 15:37:06
