-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2024 at 12:52 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `orderid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `customername` varchar(255) NOT NULL,
  `customeraddress` text NOT NULL,
  `customercontactnum` varchar(20) NOT NULL,
  `modeofpayment` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`orderid`, `userid`, `customername`, `customeraddress`, `customercontactnum`, `modeofpayment`) VALUES
(1, 1, 'Margo', 'Taytay', '123', 'cash'),
(2, 1, 'Ria', 'Taytay', '456', 'cash'),
(3, 1, 'Riri', 'Taytay', '789', 'cash'),
(4, 1, 'Garet', 'Taytay', '111', 'cash'),
(5, 1, 'Margie', 'Taytay', '222', 'cash'),
(6, 1, 'Maria', 'Taytay', '333', 'cash'),
(7, 1, 'Marga', 'Taytay', '444', 'cash'),
(8, 1, 'MM', 'Taytay', '555', 'card'),
(9, 1, 'JuanDC', 'Pasig', '777', 'card'),
(10, 1, 'Ben', 'Cainta', '9876543210', 'cash');

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `productname` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`id`, `orderid`, `productname`, `quantity`, `total`) VALUES
(1, 1, 'A1 Iced Latte', 1, 79.00),
(2, 2, 'A1 Iced Latte', 1, 79.00),
(3, 3, 'A3 Americano', 1, 69.00),
(4, 4, 'A3 Americano', 1, 69.00),
(5, 5, 'A2 Caramel Latte', 1, 89.00),
(6, 6, 'A3 Americano', 1, 69.00),
(7, 7, 'A3 Americano', 1, 69.00),
(8, 7, 'B1 Festive Macaroons', 1, 59.00),
(9, 7, 'C1 Calamari', 1, 149.00),
(10, 8, 'A1 Iced Latte', 1, 79.00),
(11, 8, 'A2 Caramel Latte', 4, 356.00),
(12, 8, 'B6 Chocolate Cake', 1, 120.00),
(13, 8, 'C2 Bacon Wrapped Jalapeño', 1, 180.00),
(14, 9, 'A1 Iced Latte', 3, 237.00),
(15, 9, 'B3 Pancake', 3, 237.00),
(16, 9, 'C3 Fried Flower', 3, 300.00),
(17, 10, 'A1 Iced Latte', 3, 510.00),
(18, 10, 'B6 Chocolate Cake', 3, 510.00),
(19, 10, 'C7 Sisig', 3, 510.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`) VALUES
(1, 'margo', 'fundano', 'margofundano@gmail.com', '$2y$10$pyTX.I0TvQUJWmYyjLTJpeSMjCZ8KkC1yx25jshpK80H1gNxKc0mW'),
(2, 'Shana', 'Gonzales', 'shanagozales@gmail.com', '$2y$10$Zkn7vldSanj4/OYayf6xsuviUz/tO0fq9euPdur7ko78rrZkqwyQ.'),
(3, 'Louise', 'Yap', 'louiseyap@gmail.com', '$2y$10$O.4K9rvuB9DiF8aKswqcD.yQGJnjIOjLrQezREM.nlLfWyUxB0zte'),
(4, 'Juan', 'Dela Cruz', 'juandc@gmail.com', '$2y$10$K6gDCoF7t7BiFtIyFUHMhusWrwfwaUvuqPC8Zd1PHTYDRe1YBzSpy'),
(5, 'Ben', 'Ten', 'benten@gmail.com', '$2y$10$Ppq.rze2obnsDug6pupebeW9gpLMnUE5WHcRE3l4JlAmmZNgZNn3q');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`orderid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderid` (`orderid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `orderdetails` (`orderid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
