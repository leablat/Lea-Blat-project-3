-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.33

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
  `commentId` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(700) DEFAULT NULL,
  `vacationId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`commentId`),
  KEY `userId_idx` (`userId`),
  KEY `vacationId_idx` (`vacationId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'whow...',30,1),(16,'not nice',62,19),(21,'nice!',58,1),(22,'Crazy place!',58,1),(23,'Perfect vacation!!!!',30,1),(24,'A dream vacation!',29,1),(25,'I enjoyed very much.',66,1);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  KEY `userId_idx` (`userId`),
  KEY `vacationId_idx` (`vacationId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `vacationId` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (3,29),(11,68),(19,58),(25,66),(25,29),(25,58),(25,57),(19,29);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Moti','Blat','m@gmail.com','1999','admin'),(3,'Lea','Blat','admin@gmail.com','123456','admin'),(11,' Moshe','Cohen','m123456@gmail.com','456789','user'),(19,'Avi','Levy','avi@gmail.com','6789','user'),(22,'Lea','Levy','l0527123860@gmail.com','1212','user'),(25,'RL','levy','1234@gmail.com','1234','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacationId` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(20) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `imageFileName` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`vacationId`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (29,'yapan','Japan is a country where ancient traditions blend seamlessly with innovative technology. Enjoy a sensory feast as you journey through the Land of the Rising Sun. Marvel at the serene beauty of Kyoto\'s ancient temples, feel the bustling energy of Tokyo\'s neon-lit streets, and savor the delicate flavors of authentic sushi in Osaka\'s vibrant markets.','2023-10-03','2023-10-16','1750','https://images.squarespace-cdn.com/content/v1/5a7c0544d74cffa3a6ce66b3/1630183858075-7KH5G5NHA4QDH5G63F3W/%D7%AA%D7%9E%D7%95%D7%A0%D7%AA+%D7%A0%D7%95%D7%A3+-%D7%94%D7%A8+%D7%A4%D7%99%D7%9C%D7%90%D7%98%D7%95%D7%A1+-+%D7%A9%D7%95%D7%95%D7%99%D7%A5.jpg?format=2500w'),(30,'Dubai','An extraordinary view can also be found in the Dubai desert, which surrounds the city. This is a very large and spectacularly beautiful desert and it is worth at least a glimpse into it with a short day trip. Outdoor enthusiasts will be able to go on longer hikes at different levels of difficulty. The Al Marmoum Nature Reserve, which covers a tenth of Dubai\'s area, or the Dubai Desert Nature Reserve, are great places to get up close and personal with the wild nature of the desert.','2023-10-02','2023-10-09','4000','https://image.content.travelyo-cdn.site/custom/holidayfinder/destinations/dubai/Dubai-cid_2.webp'),(57,'Warsaw','A vacation in Warsaw can suit almost everyone, couples or friends who are looking for a Warsaw weekend to break the routine, it is family friendly and children will also find quite a few worthwhile attractions there, as well as green and spacious parks and good food that is contrary to the popular perception.','2023-11-09','2023-11-14','670','https://image.content.travelyo-cdn.site/custom/destinations/warsaw/C-Autumn-holidays.webp'),(58,'Vienna','Vienna is a wonderful destination for the Israeli tourist, the flights to it are not particularly long or expensive, and it provides beauty and plenty of attractions for a vacation in Vienna. In addition, there is a growing Jewish community in Vienna and there are several synagogues in the city that are recommended to visit.','2023-09-25','2023-09-26','420','https://image.content.travelyo-cdn.site/custom/holidayfinder/hp/Vienna.webp'),(60,'London','The area of the capital of the United Kingdom is vast and full of attractions and things that should not be missed, a family vacation or a vacation in any other vehicle will surely include a visit to the iconic Buckingham Palace, watching the Changing of the Guard ceremony, Big Ben, and more. Due to the abundance of attractions in the city and its size, London can be suitable as a vacation for everyone.','2023-11-02','2023-11-08','1700','https://image.content.travelyo-cdn.site/custom/holidayfinder/hp_london.webp'),(66,'Pariz','Anyone who has visited Paris knows that the reputation of the city of lights as a bastion of style, romance and gourmet cuisine is fully justified. It has a stunning abundance of art, shopping, restaurants, parks and magical alleys, so much so that one visit will surely not be enough for you.','2023-10-27','2023-11-06','1000','https://cdn.xplorer.co.il/users/group2/allonkira/images/big166.jpg?i=133384674524857873'),(67,'Prague','The traditional Czech food is considered particularly delicious and comforting and there are also modern, international and trendy restaurants that you should not miss. The night life in the city will also pleasantly surprise you.','2023-11-01','2023-11-06','550','https://image.content.travelyo-cdn.site/custom/holidayfinder/destinations/prague/Prague-cid_1.webp'),(68,'Budapest','Budapest is great to soak up a European atmosphere, admire the architecture and learn about its rich past. Among the palaces, churches and cathedrals you will also find memories of a vibrant Jewish community.','2023-10-31','2023-11-04','600','https://image.content.travelyo-cdn.site/custom/holidayfinder/destinations/budapest/budapest_cid_3.webp'),(69,'Larnaca','Larnaca is a port city on the southern coast of Cyprus and one of the most popular holiday destinations on the island. Add to that comfortable weather all year round and a non-stop vacation atmosphere and you get a vacation town that is always there for you.','2023-10-30','2023-11-10','1100','https://image.content.travelyo-cdn.site/custom/holidayfinder/destinations/larnaca/Larnaca-cid_1.webp'),(70,'Bucharest','Bucharest is a city that is very cheap to travel in - from the price of flights, through the prices of accommodation to the prices of food. This also makes it attractive for those looking to do some shopping without going into the red. So if you are looking for a destination for a short, cheap and fun vacation - Bucharest is an excellent option for you.','2023-11-04','2023-11-09','550','https://image.content.travelyo-cdn.site/custom/holidayfinder/destinations/Bucharest/Bucharest-cid_1.webp'),(71,'Amsterdam','The city center is the beating heart of Amsterdam and there the main attractions await you - the Royal Palace, Dam Square, the Rijksmuseum and the Anne Frank House. That doesn\'t mean other neighborhoods aren\'t worth a visit. The Jordan quarter, which was once a neglected area, is today one of the coolest locations in the city, with an interesting food scene, art and worthwhile shops.','2023-11-02','2023-11-07','850','https://image.content.travelyo-cdn.site/custom/holidayfinder/hp/Amsterdam.webp'),(72,'Milan','Milan is a city whose Duomo is a global icon, its streets are full of charming historic buildings and world-class art is found on every corner. Even the oldest shopping center in the world is in the city and it is still luxurious and full of life - just like Milan itself.','2023-11-02','2023-11-06','650','https://image.content.travelyo-cdn.site/custom/holidayfinder/hp/Milan.webp');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-04 22:29:54
