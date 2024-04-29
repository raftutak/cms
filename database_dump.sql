-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 08, 2024 at 04:39 PM
-- Wersja serwera: 5.7.44
-- Wersja PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cms-backend`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Categories`
--

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(6, 'Koty', 'Opis kotów', '2024-01-20 20:52:16', '2024-01-20 20:52:16'),
(8, 'Miejsca', 'Jakieś miejsca', '2024-01-21 09:40:50', '2024-01-21 09:40:50'),
(10, 'Okulary', 'Oksy', '2024-01-21 09:42:27', '2024-01-21 09:42:27'),
(12, 'Laptopy', 'Coś o laptopach', '2024-01-21 09:47:03', '2024-01-21 09:47:03'),
(15, 'Technologia', '', '2024-01-23 18:12:16', '2024-01-23 18:12:31'),
(16, 'Sport', NULL, '2024-01-23 18:16:06', '2024-01-23 18:16:06'),
(17, 'Przyroda', NULL, '2024-01-23 18:17:46', '2024-01-23 18:17:46');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Images`
--

CREATE TABLE `Images` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `filepath` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  `pageId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Images`
--

INSERT INTO `Images` (`id`, `filename`, `filepath`, `caption`, `postId`, `pageId`, `createdAt`, `updatedAt`) VALUES
(5, '1705752799878-Zrzut ekranu 2024-01-12 o 14.22.57.png', 'uploads/1705752799878-Zrzut ekranu 2024-01-12 o 14.22.57.png', NULL, 15, NULL, '2024-01-20 12:13:19', '2024-01-20 12:13:19'),
(8, '1705763451963-bg3.jpg', 'uploads/1705763451963-bg3.jpg', NULL, 18, NULL, '2024-01-20 15:10:52', '2024-01-20 15:10:52'),
(10, '1705765843235-Zrzut ekranu 2024-01-15 o 22.56.50.png', 'uploads/1705765843235-Zrzut ekranu 2024-01-15 o 22.56.50.png', NULL, 20, NULL, '2024-01-20 15:50:43', '2024-01-20 15:50:43'),
(11, '1705765974487-Zrzut ekranu 2024-01-12 o 00.28.13.png', 'uploads/1705765974487-Zrzut ekranu 2024-01-12 o 00.28.13.png', NULL, 21, NULL, '2024-01-20 15:52:54', '2024-01-20 15:52:54'),
(17, '1705963626637-lake.jpg', 'uploads/1705963626637-lake.jpg', NULL, 36, NULL, '2024-01-22 22:47:06', '2024-01-22 22:47:06'),
(24, '1706090246590-Zrzut ekranu 2023-12-13 o 11.36.30.png', 'uploads/1706090246590-Zrzut ekranu 2023-12-13 o 11.36.30.png', NULL, 42, NULL, '2024-01-24 09:57:26', '2024-01-24 09:57:26'),
(26, '1706090816828-Zrzut ekranu 2024-01-23 o 19.12.59.png', 'uploads/1706090816828-Zrzut ekranu 2024-01-23 o 19.12.59.png', NULL, 40, NULL, '2024-01-24 10:06:56', '2024-01-24 10:06:56'),
(27, '1706090883870-Zrzut ekranu 2024-01-1 o 14.45.29.png', 'uploads/1706090883870-Zrzut ekranu 2024-01-1 o 14.45.29.png', NULL, 39, NULL, '2024-01-24 10:08:03', '2024-01-24 10:08:03'),
(28, '1706090908995-marita-kavelashvili-ugnrXk1129g-unsplash.jpg', 'uploads/1706090908995-marita-kavelashvili-ugnrXk1129g-unsplash.jpg', NULL, 38, NULL, '2024-01-24 10:08:29', '2024-01-24 10:08:29'),
(31, '1706092267795-3802635-77342628-2560-1440.jpg', 'uploads/1706092267795-3802635-77342628-2560-1440.jpg', NULL, 41, NULL, '2024-01-24 10:31:07', '2024-01-24 10:31:07'),
(32, '1706092284263-3802635-77342628-2560-1440.jpg', 'uploads/1706092284263-3802635-77342628-2560-1440.jpg', NULL, 41, NULL, '2024-01-24 10:31:24', '2024-01-24 10:31:24');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Pages`
--

CREATE TABLE `Pages` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text,
  `page_type` varchar(100) NOT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Pages`
--

INSERT INTO `Pages` (`id`, `title`, `content`, `page_type`, `main_image`, `created_at`, `updated_at`) VALUES
(1, 'Strona główna', '[{\"config\":{\"type\":\"carousel\",\"id\":\"item-0\",\"quantity\":3,\"items\":[{\"imageUrl\":\"https://demos.creative-tim.com/material-kit/assets-old/img/bg2.jpg\",\"header\":\"Pierwszy nagłówek\",\"paragraph\":\"Tekst numer jeden pod nagłówkiem\"},{\"imageUrl\":\"https://demos.creative-tim.com/material-kit/assets-old/img/bg3.jpg\",\"header\":\"Drugi nagłówek\",\"paragraph\":\"Tekst numer dwa pod nagłówkiem\"},{\"imageUrl\":\"https://wowslider.com/sliders/demo-93/data1/images/lake.jpg\",\"header\":\"Trzeci nagłówek\",\"paragraph\":\"Tekst numer trzy pod nagłówkiem\"}]},\"id\":\"item-0\"},{\"config\":{\"type\":\"columns\",\"id\":\"item-3\",\"columns\":[{\"header\":\"Kolumna pojedyncza\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et nunc ultrices, finibus enim eu, iaculis dui. Phasellus non nunc non sapien consectetur dapibus non nec nibh. Mauris sollicitudin dapibus velit nec congue. Vivamus lacus nisl, viverra sed ante iaculis, sodales vestibulum sapien. Aliquam felis sapien, placerat a gravida eu, congue vitae ipsum. Nam vitae sagittis tellus, sed eleifend enim. Morbi at sem maximus, pulvinar odio eu, semper sem. Cras tempus rutrum dui et volutpat. Integer faucibus velit vulputate ante ultricies, at luctus tellus fermentum. Donec dictum convallis pretium. Sed a posuere lacus. Proin dapibus sem metus, aliquet luctus tellus viverra ut. Vestibulum sit amet nulla pellentesque sem lacinia maximus.\"}],\"quantity\":1},\"id\":\"item-3\"},{\"config\":{\"type\":\"cards\",\"id\":\"1deaaea6-7fbe-4d76-b818-6e0ad143e71d\",\"cards\":[{\"imageUrl\":\"\",\"header\":\"Pierwsza\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget est quis nulla sollicitudin molestie ac non lacus. Nam viverra eu massa nec tempor. Suspendisse nisl sapien, auctor in consectetur et, fermentum dignissim dolor. Cras pellentesque leo vitae rhoncus mollis. Vestibulum eu mi sed purus eleifend ullamcorper sed vitae nisi.\"},{\"imageUrl\":\"\",\"header\":\"Druga\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget est quis nulla sollicitudin molestie ac non lacus. Nam viverra eu massa nec tempor. Suspendisse nisl sapien, auctor in consectetur et, fermentum dignissim dolor. Cras pellentesque leo vitae rhoncus mollis. Vestibulum eu mi sed purus eleifend ullamcorper sed vitae nisi.\"},{\"imageUrl\":\"\",\"header\":\"Trzecia\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget est quis nulla sollicitudin molestie ac non lacus. Nam viverra eu massa nec tempor. Suspendisse nisl sapien, auctor in consectetur et, fermentum dignissim dolor. Cras pellentesque leo vitae rhoncus mollis. Vestibulum eu mi sed purus eleifend ullamcorper sed vitae nisi.\"}],\"quantity\":3},\"id\":\"3a0a1a06-1c32-4c23-95c3-039b338ca68e\"},{\"config\":{\"type\":\"carousel\",\"id\":\"634d9d3d-4024-44c0-a5d8-9c159bcf87ca\",\"items\":[{\"imageUrl\":\"\",\"header\":\"Test bez obrazka\",\"paragraph\":\"Test slajdu bez obrazka.\"}],\"quantity\":1},\"id\":\"b47c90b1-20ea-4693-be65-738322dc52c3\"},{\"config\":{\"type\":\"cards\",\"id\":\"item-2\",\"quantity\":3,\"cards\":[{\"imageUrl\":\"https://fastly.picsum.photos/id/1045/300/200.jpg?hmac=4Xg52sOCNmpw1FxxMXc6CeKHkmcEYqmMVijRTryjqkE\",\"header\":\"Card 1\",\"paragraph\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! \"},{\"imageUrl\":\"https://fastly.picsum.photos/id/567/300/200.jpg?hmac=rpSeOvxqTP4FLuQDJKWBCXjVNx-yOvTQKUbozvUebbQ\",\"header\":\"Card 2\",\"paragraph\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! \"},{\"imageUrl\":\"https://fastly.picsum.photos/id/137/300/200.jpg?hmac=7GOEmQEJNznawKi8mMjA3tPrgb6kbZZ0qCxn8H0RKFU\",\"header\":\"Card 3\",\"paragraph\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! \"}]},\"id\":\"item-2\"},{\"config\":{\"type\":\"columns\",\"id\":\"f5899d14-dd85-4283-b45e-26e51ab92fec\",\"columns\":[{\"header\":\"Pierwsza\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget est quis nulla sollicitudin molestie ac non lacus. Nam viverra eu massa nec tempor. Suspendisse nisl sapien, auctor in consectetur et, fermentum dignissim dolor. Cras pellentesque leo vitae rhoncus mollis. Vestibulum eu mi sed purus eleifend ullamcorper sed vitae nisi.\"},{\"header\":\"Druga\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget est quis nulla sollicitudin molestie ac non lacus. Nam viverra eu massa nec tempor. Suspendisse nisl sapien, auctor in consectetur et, fermentum dignissim dolor. Cras pellentesque leo vitae rhoncus mollis. Vestibulum eu mi sed purus eleifend ullamcorper sed vitae nisi.\"}],\"quantity\":2},\"id\":\"a06e957b-995e-42dd-85c5-c8a615a38153\"},{\"config\":{\"type\":\"cards\",\"id\":\"97254bb7-7fdd-4119-bcde-9350f8d340a4\",\"cards\":[{\"imageUrl\":\"https://demos.creative-tim.com/material-kit/assets-old/img/bg2.jpg\",\"header\":\"Kolumna z jedną kartą\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget est quis nulla sollicitudin molestie ac non lacus. Nam viverra eu massa nec tempor. Suspendisse nisl sapien, auctor in consectetur et, fermentum dignissim dolor. Cras pellentesque leo vitae rhoncus mollis. Vestibulum eu mi sed purus eleifend ullamcorper sed vitae nisi.\"}],\"quantity\":1},\"id\":\"023d74af-e96f-49e2-8a4a-896c8feb6222\"},{\"config\":{\"type\":\"columns\",\"id\":\"item-1\",\"columns\":[{\"header\":\"Header 1\",\"paragraph\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! \"},{\"header\":\"Header 2\",\"paragraph\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! \"},{\"header\":\"Header 3\",\"paragraph\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! \"}],\"quantity\":3},\"id\":\"item-1\"},{\"config\":{\"type\":\"cards\",\"id\":\"c6392f78-3c4f-40e2-b558-2917837deba8\",\"cards\":[{\"imageUrl\":\"https://demos.creative-tim.com/material-kit/assets-old/img/bg3.jpg\",\"header\":\"Pierwsza\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget est quis nulla sollicitudin molestie ac non lacus. Nam viverra eu massa nec tempor. Suspendisse nisl sapien, auctor in consectetur et, fermentum dignissim dolor. Cras pellentesque leo vitae rhoncus mollis. Vestibulum eu mi sed purus eleifend ullamcorper sed vitae nisi.\"},{\"imageUrl\":\"https://demos.creative-tim.com/material-kit/assets-old/img/bg3.jpg\",\"header\":\"Druga\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget est quis nulla sollicitudin molestie ac non lacus. Nam viverra eu massa nec tempor. Suspendisse nisl sapien, auctor in consectetur et, fermentum dignissim dolor. Cras pellentesque leo vitae rhoncus mollis. Vestibulum eu mi sed purus eleifend ullamcorper sed vitae nisi.\"}],\"quantity\":2},\"id\":\"09881ce9-35e5-45d6-a3c7-2d50f39ba47c\"}]', 'homepage', NULL, '2024-01-10 00:08:53', '2024-01-23 20:21:36'),
(7, 'Hiszpania', '[{\"config\":{\"type\":\"columns\",\"id\":\"item-0\",\"columns\":[{\"header\":\"Hiszpania\",\"paragraph\":\"Aenean suscipit mi lectus, vitae sagittis libero ultrices auctor. Proin ultricies consequat porttitor. Proin et porttitor mi. Duis in arcu fringilla, blandit quam in, imperdiet arcu. Aenean id sagittis dolor, nec luctus metus. Vivamus at lectus nunc. Integer vulputate, tortor vel aliquam tristique, nunc neque rutrum turpis, ac tempor massa nulla sed nisl. In lectus ligula, imperdiet non consectetur a, ultricies nec justo. Donec fringilla vehicula nibh ac ornare. Aenean magna arcu, dapibus in tincidunt ac, consequat quis dui. Praesent pulvinar, erat euismod vestibulum volutpat, lacus sapien rhoncus nunc, eleifend fringilla nibh nunc et magna. Duis euismod non diam quis lacinia. Sed nec urna sed sem gravida viverra. Vivamus rhoncus tortor nisl, id congue velit aliquet non. Quisque pharetra ac lacus ac suscipit. Aenean suscipit mi lectus, vitae sagittis libero ultrices auctor. Proin ultricies consequat porttitor. Proin et porttitor mi. Duis in arcu fringilla, blandit quam in, imperdiet arcu. Aenean id sagittis dolor, nec luctus metus. Vivamus at lectus nunc. Integer vulputate, tortor vel aliquam tristique, nunc neque rutrum turpis, ac tempor massa nulla sed nisl. In lectus ligula, imperdiet non consectetur a, ultricies nec justo. Donec fringilla vehicula nibh ac ornare. Aenean magna arcu, dapibus in tincidunt ac, consequat quis dui. Praesent pulvinar, erat euismod vestibulum volutpat, lacus sapien rhoncus nunc, eleifend fringilla nibh nunc et magna. Duis euismod non diam quis lacinia. Sed nec urna sed sem gravida viverra. Vivamus rhoncus tortor nisl, id congue velit aliquet non. Quisque pharetra ac lacus ac suscipit.\"}],\"quantity\":1},\"id\":\"item-0\"},{\"config\":{\"type\":\"cards\",\"id\":\"4eb12395-aed4-4872-9df8-032bf7feeac4\",\"cards\":[{\"imageUrl\":\"https://i.iplsc.com/-/00053AH4DVD5NUC7-C461.jpg\",\"header\":\"Camp Nou\",\"paragraph\":\"Aenean suscipit mi lectus, vitae sagittis libero ultrices auctor. Proin ultricies consequat porttitor. Proin et porttitor mi. Duis in arcu fringilla, blandit quam in, imperdiet arcu. Aenean id sagittis dolor, nec luctus metus. Vivamus at lectus nunc. Integer vulputate, tortor vel aliquam tristique, nunc neque rutrum turpis, ac tempor massa nulla sed nisl. In lectus ligula, imperdiet non consectetur a, ultricies nec justo. Donec fringilla vehicula nibh ac ornare. Aenean magna arcu, dapibus in tincidunt ac, consequat quis dui. Praesent pulvinar, erat euismod vestibulum volutpat, lacus sapien rhoncus nunc, eleifend fringilla nibh nunc et magna. Duis euismod non diam quis lacinia. Sed nec urna sed sem gravida viverra. Vivamus rhoncus tortor nisl, id congue velit aliquet non. Quisque pharetra ac lacus ac suscipit. Aenean suscipit mi lectus, vitae sagittis libero ultrices auctor. Proin ultricies consequat porttitor. Proin et porttitor mi. Duis in arcu fringilla, blandit quam in, imperdiet arcu. Aenean id sagittis dolor, nec luctus metus. Vivamus at lectus nunc. Integer vulputate, tortor vel aliquam tristique, nunc neque rutrum turpis, ac tempor massa nulla sed nisl. In lectus ligula, imperdiet non consectetur a, ultricies nec justo. Donec fringilla vehicula nibh ac ornare. Aenean magna arcu, dapibus in tincidunt ac, consequat quis dui. Praesent pulvinar, erat euismod vestibulum volutpat, lacus sapien rhoncus nunc, eleifend fringilla nibh nunc et magna. Duis euismod non diam quis lacinia. Sed nec urna sed sem gravida viverra. Vivamus rhoncus tortor nisl, id congue velit aliquet non. Quisque pharetra ac lacus ac suscipit.\"},{\"imageUrl\":\"https://i.iplsc.com/-/00053AH4DVD5NUC7-C461.jpg\",\"header\":\"Camp Nou\",\"paragraph\":\"Aenean suscipit mi lectus, vitae sagittis libero ultrices auctor. Proin ultricies consequat porttitor. Proin et porttitor mi. Duis in arcu fringilla, blandit quam in, imperdiet arcu. Aenean id sagittis dolor, nec luctus metus. Vivamus at lectus nunc. Integer vulputate, tortor vel aliquam tristique, nunc neque rutrum turpis, ac tempor massa nulla sed nisl. In lectus ligula, imperdiet non consectetur a, ultricies nec justo. Donec fringilla vehicula nibh ac ornare. Aenean magna arcu, dapibus in tincidunt ac, consequat quis dui. Praesent pulvinar, erat euismod vestibulum volutpat, lacus sapien rhoncus nunc, eleifend fringilla nibh nunc et magna. Duis euismod non diam quis lacinia. Sed nec urna sed sem gravida viverra. Vivamus rhoncus tortor nisl, id congue velit aliquet non. Quisque pharetra ac lacus ac suscipit. Aenean suscipit mi lectus, vitae sagittis libero ultrices auctor. Proin ultricies consequat porttitor. Proin et porttitor mi. Duis in arcu fringilla, blandit quam in, imperdiet arcu. Aenean id sagittis dolor, nec luctus metus. Vivamus at lectus nunc. Integer vulputate, tortor vel aliquam tristique, nunc neque rutrum turpis, ac tempor massa nulla sed nisl. In lectus ligula, imperdiet non consectetur a, ultricies nec justo. Donec fringilla vehicula nibh ac ornare. Aenean magna arcu, dapibus in tincidunt ac, consequat quis dui. Praesent pulvinar, erat euismod vestibulum volutpat, lacus sapien rhoncus nunc, eleifend fringilla nibh nunc et magna. Duis euismod non diam quis lacinia. Sed nec urna sed sem gravida viverra. Vivamus rhoncus tortor nisl, id congue velit aliquet non. Quisque pharetra ac lacus ac suscipit.\"}],\"quantity\":2},\"id\":\"2da5a2e7-e9b7-46ae-a0ba-6080f5e4265a\"},{\"config\":{\"type\":\"columns\",\"id\":\"item-1\",\"columns\":[{\"header\":\"Nagłówek 2\",\"paragraph\":\"Aenean suscipit mi lectus, vitae sagittis libero ultrices auctor. Proin ultricies consequat porttitor. Proin et porttitor mi. Duis in arcu fringilla, blandit quam in, imperdiet arcu. Aenean id sagittis dolor, nec luctus metus. Vivamus at lectus nunc. Integer vulputate, tortor vel aliquam tristique, nunc neque rutrum turpis, ac tempor massa nulla sed nisl. In lectus ligula, imperdiet non consectetur a, ultricies nec justo. Donec fringilla vehicula nibh ac ornare. Aenean magna arcu, dapibus in tincidunt ac, consequat quis dui. Praesent pulvinar, erat euismod vestibulum volutpat, lacus sapien rhoncus nunc, eleifend fringilla nibh nunc et magna. Duis euismod non diam quis lacinia. Sed nec urna sed sem gravida viverra. Vivamus rhoncus tortor nisl, id congue velit aliquet non. Quisque pharetra ac lacus ac suscipit. Aenean suscipit mi lectus, vitae sagittis libero ultrices auctor. Proin ultricies consequat porttitor. Proin et porttitor mi. Duis in arcu fringilla, blandit quam in, imperdiet arcu. Aenean id sagittis dolor, nec luctus metus. Vivamus at lectus nunc. Integer vulputate, tortor vel aliquam tristique, nunc neque rutrum turpis, ac tempor massa nulla sed nisl. In lectus ligula, imperdiet non consectetur a, ultricies nec justo. Donec fringilla vehicula nibh ac ornare. Aenean magna arcu, dapibus in tincidunt ac, consequat quis dui. Praesent pulvinar, erat euismod vestibulum volutpat, lacus sapien rhoncus nunc, eleifend fringilla nibh nunc et magna. Duis euismod non diam quis lacinia. Sed nec urna sed sem gravida viverra. Vivamus rhoncus tortor nisl, id congue velit aliquet non. Quisque pharetra ac lacus ac suscipit.\"}],\"quantity\":1},\"id\":\"item-1\"}]', 'custom', NULL, '2024-01-11 16:22:09', '2024-01-23 19:47:39'),
(8, 'Portugalia', '[{\"config\":{\"type\":\"columns\",\"id\":\"item-3\",\"columns\":[{\"header\":\"Portugalia\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et nunc ultrices, finibus enim eu, iaculis dui. Phasellus non nunc non sapien consectetur dapibus non nec nibh. Mauris sollicitudin dapibus velit nec congue. Vivamus lacus nisl, viverra sed ante iaculis, sodales vestibulum sapien. Aliquam felis sapien, placerat a gravida eu, congue vitae ipsum. Nam vitae sagittis tellus, sed eleifend enim. Morbi at sem maximus, pulvinar odio eu, semper sem. Cras tempus rutrum dui et volutpat. Integer faucibus velit vulputate ante ultricies, at luctus tellus fermentum. Donec dictum convallis pretium. Sed a posuere lacus. Proin dapibus sem metus, aliquet luctus tellus viverra ut. Vestibulum sit amet nulla pellentesque sem lacinia maximus.\"}],\"quantity\":1},\"id\":\"item-3\"},{\"config\":{\"type\":\"cards\",\"id\":\"6776a900-c655-458b-b125-2775144fee8c\",\"cards\":[{\"imageUrl\":\"https://wygodniwpodrozy.pl/wp-content/uploads/2023/03/Madera-Porto-da-Cruz.jpg\",\"header\":\"Madera\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis odio iaculis metus volutpat aliquet. Praesent congue interdum tortor, sit amet posuere nunc dignissim at. Nulla quis posuere tellus. Donec accumsan pharetra ex, eget blandit augue efficitur nec. Morbi venenatis bibendum est et venenatis. Aenean posuere arcu vitae sagittis placerat. Ut eget erat in diam lobortis dignissim pharetra sed tellus. Phasellus at augue ut felis ullamcorper tempus. Curabitur interdum libero sed felis sodales, at egestas dolor porttitor. Morbi porttitor tortor eget sollicitudin finibus.\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis odio iaculis metus volutpat aliquet. Praesent congue interdum tortor, sit amet posuere nunc dignissim at. Nulla quis posuere tellus. Donec accumsan pharetra ex, eget blandit augue efficitur nec. Morbi venenatis bibendum est et venenatis. Aenean posuere arcu vitae sagittis placerat. Ut eget erat in diam lobortis dignissim pharetra sed tellus. Phasellus at augue ut felis ullamcorper tempus. Curabitur interdum libero sed felis sodales, at egestas dolor porttitor. Morbi porttitor tortor eget sollicitudin finibus.\"}],\"quantity\":1},\"id\":\"f16ed7b6-ef39-4e88-8bd9-e0b663c2af81\"},{\"config\":{\"type\":\"columns\",\"id\":\"item-1\",\"columns\":[{\"header\":\"Header 1\",\"paragraph\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! \"},{\"header\":\"Header 2\",\"paragraph\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! \"},{\"header\":\"Header 3\",\"paragraph\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste labore, provident aliquid recusandae placeat! \"}],\"quantity\":3},\"id\":\"item-1\"}]', 'custom', NULL, '2024-01-11 21:46:20', '2024-01-23 19:44:53'),
(13, 'Google Pixel', '[{\"config\":{\"type\":\"cards\",\"id\":\"44ba6138-ace7-4e11-8ee3-804eba3422f7\",\"cards\":[{\"imageUrl\":\"https://lifehacker.com/imagery/articles/01HF2GWY6XJPC2QGWSNZDBG3F9/hero-image.fill.size_1248x702.v1699833587.jpg\",\"header\":\"Google Pixel\",\"paragraph\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit a odio eu ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In venenatis augue eu neque tristique aliquam. Mauris vehicula lorem mauris, sed condimentum tortor accumsan cursus. Praesent interdum suscipit purus quis convallis. Pellentesque vel orci ut ligula elementum venenatis sit amet ut turpis. Curabitur finibus ut tortor vitae sagittis. Nullam condimentum, nulla eu fringilla fermentum, tortor magna pellentesque justo, sit amet convallis tellus erat id magna. Vivamus efficitur consectetur aliquet. Maecenas lacus leo, vestibulum rhoncus aliquet non, convallis ut nibh.\"}],\"quantity\":1},\"id\":\"5b6b4961-9dd9-4123-9ac4-32d0b38f4a71\"}]', 'custom', NULL, '2024-01-23 00:01:45', '2024-01-23 19:51:55'),
(14, 'iPhone 15 Pro', '[{\"config\":{\"type\":\"cards\",\"id\":\"fd61ba39-bd3c-41e5-90dc-49ad9185c311\",\"cards\":[{\"imageUrl\":\"https://images.hindustantimes.com/tech/img/2023/08/30/960x540/quinn-battick-ZvtYlEeA44I-unsplash_1692251858882_1693382370774.jpg\",\"header\":\"iPhone 15 Pro\",\"paragraph\":\"Llorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit a odio eu ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In venenatis augue eu neque tristique aliquam. Mauris vehicula lorem mauris, sed condimentum tortor accumsan cursus. Praesent interdum suscipit purus quis convallis. Pellentesque vel orci ut ligula elementum venenatis sit amet ut turpis. Curabitur finibus ut tortor vitae sagittis. Nullam condimentum, nulla eu fringilla fermentum, tortor magna pellentesque justo, sit amet convallis tellus erat id magna. Vivamus efficitur consectetur aliquet. Maecenas lacus leo, vestibulum rhoncus aliquet non, convallis ut nibh.\"}],\"quantity\":1},\"id\":\"a58c8ff7-0755-42ff-9141-d2ac016ba1df\"}]', 'custom', NULL, '2024-01-23 17:22:39', '2024-01-28 12:57:43');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `PostCategories`
--

CREATE TABLE `PostCategories` (
  `postId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `PostCategories`
--

INSERT INTO `PostCategories` (`postId`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(15, 15, '2024-01-23 18:23:25', '2024-01-23 18:23:25'),
(18, 8, '2024-01-23 18:24:46', '2024-01-23 18:24:46'),
(18, 17, '2024-01-23 18:24:46', '2024-01-23 18:24:46'),
(20, 15, '2024-01-23 18:22:32', '2024-01-23 18:22:32'),
(21, 15, '2024-01-23 18:21:37', '2024-01-23 18:21:37'),
(36, 8, '2024-01-23 18:20:14', '2024-01-23 18:20:14'),
(36, 17, '2024-01-23 18:20:14', '2024-01-23 18:20:14'),
(38, 8, '2024-01-24 10:32:17', '2024-01-24 10:32:17'),
(38, 17, '2024-01-24 10:32:17', '2024-01-24 10:32:17'),
(39, 16, '2024-01-24 10:31:52', '2024-01-24 10:31:52'),
(40, 10, '2024-01-24 10:31:43', '2024-01-24 10:31:43'),
(40, 15, '2024-01-24 10:31:43', '2024-01-24 10:31:43'),
(41, 16, '2024-01-24 10:31:24', '2024-01-24 10:31:24');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Posts`
--

CREATE TABLE `Posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `imageId` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Posts`
--

INSERT INTO `Posts` (`id`, `title`, `content`, `author_id`, `imageId`, `created_at`, `updated_at`, `meta_title`, `meta_description`, `slug`) VALUES
(15, 'Ponad 3 rejestracje na nowym portalu', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>', NULL, 0, '2024-01-20 12:13:19', '2024-01-23 18:23:25', NULL, NULL, 'test-obraz-1-15'),
(18, 'Podróż do Swarzędza', '<h2>Wstęp</h2>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur lectus finibus, pretium est vel, efficitur mauris. Donec rhoncus, tortor sit amet dictum finibus, mi mauris scelerisque sem, quis efficitur nunc dolor non arcu. Duis gravida diam eu libero tristique dapibus. Ut luctus facilisis ante, fermentum vehicula neque euismod eget. Curabitur massa arcu, tempor ultricies turpis nec, euismod elementum massa. Nunc pretium ornare felis, eget tempor sapien efficitur posuere. Vestibulum tincidunt urna nec interdum ullamcorper. Donec id est sed orci ultricies vulputate eu vitae lorem. Donec sodales bibendum quam, quis mattis leo vulputate ac.</p>\r\n<h2>Dalsze tematy</h2>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur lectus finibus, pretium est vel, efficitur mauris. Donec rhoncus, tortor sit amet dictum finibus, mi mauris scelerisque sem, quis efficitur nunc dolor non arcu. Duis gravida diam eu libero tristique dapibus. Ut luctus facilisis ante, fermentum vehicula neque euismod eget. Curabitur massa arcu, tempor ultricies turpis nec, euismod elementum massa. Nunc pretium ornare felis, eget tempor sapien efficitur posuere. Vestibulum tincidunt urna nec interdum ullamcorper. Donec id est sed orci ultricies vulputate eu vitae lorem. Donec sodales bibendum quam, quis mattis leo vulputate ac.</p>\r\n<h2>Koniec</h2>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur lectus finibus, pretium est vel, efficitur mauris. Donec rhoncus, tortor sit amet dictum finibus, mi mauris scelerisque sem, quis efficitur nunc dolor non arcu. Duis gravida diam eu libero tristique dapibus. Ut luctus facilisis ante, fermentum vehicula neque euismod eget. Curabitur massa arcu, tempor ultricies turpis nec, euismod elementum massa. Nunc pretium ornare felis, eget tempor sapien efficitur posuere. Vestibulum tincidunt urna nec interdum ullamcorper. Donec id est sed orci ultricies vulputate eu vitae lorem. Donec sodales bibendum quam, quis mattis leo vulputate ac.</p>', NULL, 0, '2024-01-20 15:10:52', '2024-01-23 18:24:46', NULL, NULL, 'podroz-do-portugalii-18'),
(20, 'Jak wyjść z vima?', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>', NULL, 0, '2024-01-20 15:50:43', '2024-01-23 18:22:32', NULL, NULL, 'test-20'),
(21, 'WordPress kupuje potężny startup', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>', NULL, 11, '2024-01-20 15:52:54', '2024-01-23 18:21:37', NULL, NULL, 'test-21'),
(36, 'Wyprawa do Kiekrza', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>', 11, 17, '2024-01-22 22:46:14', '2024-01-23 18:20:14', NULL, NULL, 'tytul-nowego-posta-36'),
(38, 'Wypoczynek na Dębcu', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>', 11, 28, '2024-01-23 17:35:53', '2024-01-24 10:08:29', NULL, NULL, 'test2-38'),
(39, 'Zbigniew Boniek przesadził?', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>', 11, 27, '2024-01-23 18:10:17', '2024-01-24 10:08:03', NULL, NULL, 'testowy-nowy-wpis-39'),
(40, 'Premiera Apple Vision Pro', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eleifend lacus. Cras sed consequat ipsum, non ornare odio. In hendrerit scelerisque nibh, eu lobortis augue ullamcorper eu. Praesent aliquam nulla id tempor feugiat. Nullam semper erat nec risus finibus volutpat. Integer varius aliquet malesuada. Vivamus velit tellus, bibendum in mauris id, eleifend tincidunt quam. Suspendisse rhoncus ullamcorper sagittis. Integer aliquam ut augue id aliquet. Nam molestie sapien nec risus tempus, ornare facilisis leo vulputate. Integer a fringilla ante. Nulla laoreet risus ante, ut ultrices metus ullamcorper a. In faucibus sed est nec rhoncus.</p>', 11, 26, '2024-01-23 18:13:50', '2024-01-24 10:06:56', NULL, NULL, 'premiera-apple-vision-pro-40'),
(41, 'Lewandowski nie strzela', '<h2>Wstęp</h2>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur lectus finibus, pretium est vel, efficitur mauris. Donec rhoncus, tortor sit amet dictum finibus, mi mauris scelerisque sem, quis efficitur nunc dolor non arcu. Duis gravida diam eu libero tristique dapibus. Ut luctus facilisis ante, fermentum vehicula neque euismod eget. Curabitur massa arcu, tempor ultricies turpis nec, euismod elementum massa. Nunc pretium ornare felis, eget tempor sapien efficitur posuere. Vestibulum tincidunt urna nec interdum ullamcorper. Donec id est sed orci ultricies vulputate eu vitae lorem. Donec sodales bibendum quam, quis mattis leo vulputate ac.</p>\r\n<h2>Dalsze tematy</h2>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur lectus finibus, pretium est vel, efficitur mauris. Donec rhoncus, tortor sit amet dictum finibus, mi mauris scelerisque sem, quis efficitur nunc dolor non arcu. Duis gravida diam eu libero tristique dapibus. Ut luctus facilisis ante, fermentum vehicula neque euismod eget. Curabitur massa arcu, tempor ultricies turpis nec, euismod elementum massa. Nunc pretium ornare felis, eget tempor sapien efficitur posuere. Vestibulum tincidunt urna nec interdum ullamcorper. Donec id est sed orci ultricies vulputate eu vitae lorem. Donec sodales bibendum quam, quis mattis leo vulputate ac.</p>\r\n<h2>Koniec</h2>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur lectus finibus, pretium est vel, efficitur mauris. Donec rhoncus, tortor sit amet dictum finibus, mi mauris scelerisque sem, quis efficitur nunc dolor non arcu. Duis gravida diam eu libero tristique dapibus. Ut luctus facilisis ante, fermentum vehicula neque euismod eget. Curabitur massa arcu, tempor ultricies turpis nec, euismod elementum massa. Nunc pretium ornare felis, eget tempor sapien efficitur posuere. Vestibulum tincidunt urna nec interdum ullamcorper. Donec id est sed orci ultricies vulputate eu vitae lorem. Donec sodales bibendum quam, quis mattis leo vulputate ac.</p>', 11, 32, '2024-01-23 18:17:19', '2024-01-24 10:31:24', NULL, NULL, 'lewandowski-nie-strzela-41'),
(42, 'Zostań programistą 15kk', '<h2>Wpisz tutaj treść posta.sadas</h2>\r\n<p>Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis.&nbsp;</p>\r\n<h2>Wpisz tutaj treść posta.sadas</h2>\r\n<p>Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis.&nbsp;</p>\r\n<h2>Wpisz tutaj treść posta.sadas</h2>\r\n<p>Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis. Testowy wpis.&nbsp;</p>', 11, 24, '2024-01-24 09:57:26', '2024-01-28 12:57:28', NULL, NULL, 'nowy-post-ggmonitor-42');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `SiteConfigs`
--

CREATE TABLE `SiteConfigs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `menu` text NOT NULL,
  `footer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `SiteConfigs`
--

INSERT INTO `SiteConfigs` (`id`, `title`, `menu`, `footer`) VALUES
(1, 'Projekt CMS', '[{\"menuId\":1,\"menuName\":\"Wycieczki\",\"active\":true,\"links\":[{\"id\":8,\"name\":\"Portugalia\",\"path\":\"pages/8\"},{\"id\":7,\"name\":\"Hiszpania\",\"path\":\"pages/7\"}]},{\"menuId\":2,\"menuName\":\"Telefony\",\"active\":true,\"links\":[{\"id\":13,\"name\":\"Google Pixel\",\"path\":\"pages/13\"},{\"id\":14,\"name\":\"iPhone 15 Pro\",\"path\":\"pages/14\"}]},{\"menuId\":3,\"menuName\":\"Jeszcze inne\",\"active\":false,\"links\":[]},{\"menuId\":4,\"menuName\":\"Czwarte\",\"active\":false,\"links\":[]}]', 'Projekt CMS © 2024');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `role`, `active`, `created_at`, `updated_at`) VALUES
(11, 'Rafał Tutak', 'raftutak@gmail.com', '$2b$10$.ECAJGFp.I34TBFSxZQU5edqJr6WiHHdGzy4G2llpwBPUmB2zdAB6', 'ADMINISTRATOR', 1, '2024-01-21 16:57:41', '2024-01-23 20:04:04'),
(12, 'Konto Testowe', 'alierafal8@gmail.com', '$2b$10$1YLbuhu3HXgaeEzt5CzzVezAR9c3zpFRl3aB8GLbeMPFto60L9NhS', 'ADMINISTRATOR', 1, '2024-01-23 20:03:26', '2024-01-24 17:30:37'),
(13, 'Testowe Można Usunąć', 'rawinek@gmail.com', '$2b$10$m1GzG.WOLztlntGv.GsRNOJsiakiJamcrVs0OCpMIOnqoaoYKAXzi', 'MODERATOR', 0, '2024-01-23 20:27:34', '2024-01-23 20:28:02'),
(15, 'Testowy Moderator', 'rafalttt@email10p.org', '$2b$10$/CgFpOLRCA6/ORhPyZLQpuyWD/Ar3EfMjbQSLsv9kMtvBXAoPiYGy', 'MODERATOR', 1, '2024-01-24 17:29:29', '2024-01-24 17:29:29'),
(16, 'Zablokowany User', 'lockedrafaltttt@email10p.org', '$2b$10$s5WFgiF7VRI2ldxRWptD..thjdpYDAORW9s5YTcQfKsqTqLE4uQ0.', 'ADMINISTRATOR', 0, '2024-01-24 17:32:50', '2024-01-24 17:33:14'),
(17, 'jakies dane', 'rochegigya@gmail.com', '$2b$10$DAnJ2/4L4KJbLnElm1c6/.SpIwNUGPUsE7waQDCrD8vaZ5ujeJg8e', 'MODERATOR', 1, '2024-03-02 14:04:53', '2024-03-02 14:04:53');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserTokens`
--

CREATE TABLE `UserTokens` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `expiresAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `UserTokens`
--

INSERT INTO `UserTokens` (`id`, `email`, `role`, `token`, `type`, `expiresAt`, `createdAt`, `updatedAt`) VALUES
(7, 'alierafal9@gmail.com', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWVyYWZhbDlAZ21haWwuY29tIiwiaWF0IjoxNzA0ODk4MTUxLCJleHAiOjE3MDQ5ODQ1NTF9.mDuywGvNALReN0jmAqZAKGF74saAnALzY8cJfnSwu58', 'INVITATION', '2024-01-11 14:49:11', '2024-01-10 14:49:11', '2024-01-10 14:49:11'),
(9, 'alierafal10@gmail.com', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWVyYWZhbDEwQGdtYWlsLmNvbSIsImlhdCI6MTcwNDg5ODI4OSwiZXhwIjoxNzA0OTg0Njg5fQ.y_cfYiD3mxhOpJLG94SU94cVnYjGxLYULgndvEeg6_Y', 'INVITATION', '2024-01-11 14:51:29', '2024-01-10 14:51:29', '2024-01-10 14:51:29'),
(12, 'kominstein+15@gmail.com', 'ADMINISTRATOR', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtvbWluc3RlaW4rMTVAZ21haWwuY29tIiwiaWF0IjoxNzA0OTAwNzk3LCJleHAiOjE3MDQ5ODcxOTd9.1HdNwBRndYIe-GSSSYWr8xD_btKXPOT_lv2bFPyU6yk', 'INVITATION', '2024-01-11 15:33:17', '2024-01-10 15:33:17', '2024-01-10 15:33:17'),
(15, 'kominstein+30@gmail.com', 'MODERATOR', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtvbWluc3RlaW4rMzBAZ21haWwuY29tIiwiaWF0IjoxNzA0OTAwOTA2LCJleHAiOjE3MDQ5ODczMDZ9.6mS6PQE7a76ZZpbn645k-riL7qlyZ_atrsVCBDnFbL8', 'INVITATION', '2024-01-11 15:35:06', '2024-01-10 15:35:06', '2024-01-10 15:35:06'),
(18, 'alierafal4@gmail.com', 'MODERATOR', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWVyYWZhbDRAZ21haWwuY29tIiwiaWF0IjoxNzA0OTI3OTI5LCJleHAiOjE3MDUwMTQzMjl9.EK_kvwUub16ZR6nxGaPNvQnzmhnSrC4qoed4RVv89U0', 'INVITATION', '2024-01-11 23:05:29', '2024-01-10 23:05:29', '2024-01-10 23:05:29');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `Images`
--
ALTER TABLE `Images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`),
  ADD KEY `pageId` (`pageId`);

--
-- Indeksy dla tabeli `Pages`
--
ALTER TABLE `Pages`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `PostCategories`
--
ALTER TABLE `PostCategories`
  ADD PRIMARY KEY (`postId`,`categoryId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indeksy dla tabeli `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `imageId` (`imageId`),
  ADD KEY `Posts_ibfk_1` (`author_id`);

--
-- Indeksy dla tabeli `SiteConfigs`
--
ALTER TABLE `SiteConfigs`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeksy dla tabeli `UserTokens`
--
ALTER TABLE `UserTokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `Images`
--
ALTER TABLE `Images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `Pages`
--
ALTER TABLE `Pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `SiteConfigs`
--
ALTER TABLE `SiteConfigs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `UserTokens`
--
ALTER TABLE `UserTokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Images`
--
ALTER TABLE `Images`
  ADD CONSTRAINT `Images_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`),
  ADD CONSTRAINT `Images_ibfk_2` FOREIGN KEY (`pageId`) REFERENCES `Pages` (`id`);

--
-- Constraints for table `PostCategories`
--
ALTER TABLE `PostCategories`
  ADD CONSTRAINT `PostCategories_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`),
  ADD CONSTRAINT `PostCategories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`);

--
-- Constraints for table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `Posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `Users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
