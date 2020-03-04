-- MySQL dump 10.16  Distrib 10.2.14-MariaDB, for osx10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: we_fly
-- ------------------------------------------------------
-- Server version	10.2.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cities`
--

CREATE DATABASE we_fly;
USE we_fly;

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cities_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` (`id`, `city`) VALUES (1,'Copenhagen'),(2,'Rome'),(3,'Beijing'),(4,'Tokyo'),(5,'Chengdu');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flights` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `departure` varchar(50) NOT NULL,
  `arrival` varchar(50) NOT NULL,
  `departure_date` datetime NOT NULL,
  `arrival_date` datetime NOT NULL,
  `seat_number` int(11) NOT NULL,
  `base_price` double NOT NULL,
  `first_class` double NOT NULL,
  `seat_rows` int(11) NOT NULL,
  `meals_price` double DEFAULT NULL,
  `number_of_meals` int(11) DEFAULT NULL,
  `insurance_price` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `flights_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` (`id`, `departure`, `arrival`, `departure_date`, `arrival_date`, `seat_number`, `base_price`, `first_class`, `seat_rows`, `meals_price`, `number_of_meals`, `insurance_price`) VALUES (1,'Copenhagen','Tokyo','2018-05-03 15:45:15','2018-05-03 20:45:00',12,100,200,6,20,2,50),(2,'Tokyo','Copenhagen','2018-05-05 16:40:30','2018-05-05 23:45:00',12,100,250,6,20,2,50);
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flight_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `seat_number` int(11) NOT NULL,
  `seat_row` varchar(1) NOT NULL,
  `insurance` tinyint(1) DEFAULT NULL,
  `meals` tinyint(1) DEFAULT NULL,
  `total_price` float NOT NULL,
  `class` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reservations_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` (`id`, `flight_id`, `customer_id`, `seat_number`, `seat_row`, `insurance`, `meals`, `total_price`, `class`) VALUES (1,1,1,1,'1',0,0,100,'2'),(2,1,1,1,'2',2,2,100,'2'),(3,2,1,1,'2',0,0,100,'2'),(4,2,1,1,'1',0,0,100,'2');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `passport_name` varchar(50) NOT NULL,
  `passport_number` varchar(50) NOT NULL,
  `passport_release_date` varchar(7) NOT NULL,
  `passport_expiration_date` varchar(7) NOT NULL,
  `card_number` varchar(50) NOT NULL,
  `card_expiration_date` varchar(7) NOT NULL,
  `card_cvv` varchar(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_id_uindex` (`id`),
  UNIQUE KEY `users_email_uindex` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `passport_name`, `passport_number`, `passport_release_date`, `passport_expiration_date`, `card_number`, `card_expiration_date`, `card_cvv`) VALUES (1,'andrei@gmail.com','password','Andrei Ungureanu','234ASDRO09872','10/2019','12/2020','2020909060608080','10/2022','223');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-06 14:38:52
