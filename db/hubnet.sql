-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Okt 2025 pada 16.48
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hubnet`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_airline`
--

CREATE TABLE `tb_airline` (
  `id_air` int(11) NOT NULL,
  `airline_code` varchar(5) DEFAULT NULL,
  `airline_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `tb_airline`
--

INSERT INTO `tb_airline` (`id_air`, `airline_code`, `airline_name`) VALUES
(1, '2Y', 'My Indo Airlines'),
(2, 'AK', 'Air Asia Malaysia'),
(3, 'AZ', 'Silkway Airlines'),
(4, 'MH', 'Malaysia Airlines'),
(5, 'QZ', 'Air Asia Indonesia'),
(6, '0B', 'BBN Airlines Indonesia'),
(7, '2T', 'West Star Aviation'),
(8, '3K', 'Jetstar Asia Airways'),
(9, '5J', 'Cebu Pacific'),
(10, '8B', 'Transnusa'),
(11, '8K', 'K-Mile'),
(12, 'AX', 'Air X Charter'),
(13, 'BR', 'Eva Air'),
(14, 'BS', 'Bluesky Airways'),
(15, 'BT', 'Volkswagen Airservice'),
(16, 'CV', 'Cargolux'),
(17, 'CX', 'Cathay Pacific'),
(18, 'EI', 'Alliance Flight Support'),
(19, 'EK', 'Emirates Airlines'),
(20, 'EY', 'Etihad Airways'),
(21, 'FS', 'Airfast Indonesia'),
(22, 'GM', 'Tri MG'),
(23, 'HZ', 'Alpha Star Aviation Services'),
(24, 'IG', 'Skytaxi'),
(25, 'IN', 'Nam Air'),
(26, 'NH', 'All Nippon Airways'),
(27, 'NZ', 'Air New Zealand'),
(28, 'OZ', 'Asiana Airlines'),
(29, 'PR', 'Philippine Airlines'),
(30, 'QF', 'Qantas'),
(31, 'QR', 'Qatar Airways'),
(32, 'SQ', 'Singapore Airlines'),
(33, 'SV', 'Saudia'),
(34, 'TA', 'TACA International'),
(35, 'TK', 'Turkish Airlines'),
(36, 'VA', 'Virgin Australia'),
(37, 'WY', 'Oman Air'),
(38, 'FD', 'Thai AirAsia'),
(39, 'HO', 'Juneyao Airlines'),
(40, 'JX', 'Starlux Airlines'),
(41, 'MU', 'China Eastern Airlines'),
(42, 'SJ', 'Sriwijaya Air'),
(43, '7B', 'Kologk Aviation'),
(44, 'AI', 'Air India');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_role`
--

CREATE TABLE `tb_role` (
  `id_role` int(11) NOT NULL,
  `code_role` varchar(191) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `tb_role`
--

INSERT INTO `tb_role` (`id_role`, `code_role`, `is_active`) VALUES
(1, 'Admin', 1),
(2, 'Airline', 1),
(3, 'View', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_user`
--

CREATE TABLE `tb_user` (
  `id_usr` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `id_air` int(11) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `tb_user`
--

INSERT INTO `tb_user` (`id_usr`, `id_role`, `email`, `password`, `is_active`) VALUES
(1, 1, 'admin@jas.com', '$2b$12$asemg7rvULhJtw8Oc0btIuOWJZoJG3yhJfdE0RIBvA8ijYpk7ufz2', 1),
(2, 2, 'airline@jas.com', '$2b$12$8Q7k58yanTGVrzoc.BJ.5.IoeRr3gjn1FFiNHzP.Qp58xbY03XXgm', 1),
(3, 3, 'view@jas.com', '$2b$12$qrMWZTe0v4CsR94gGE3S4uvGRWJPrTKd3tEjYCbsadUS5oCaq97Pa', 1),
(4, 1, 'erva@gmail.com', '$2b$12$OyjOo8P.6Ll49K7jl2uXB.uAVy/.Zfr6Zx4QIquIFr2gtitRpSKZ.', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tb_airline`
--
ALTER TABLE `tb_airline`
  ADD PRIMARY KEY (`id_air`);

--
-- Indeks untuk tabel `tb_role`
--
ALTER TABLE `tb_role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indeks untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id_usr`),
  ADD UNIQUE KEY `tb_user_email_key` (`email`),
  ADD KEY `tb_user_id_role_fkey` (`id_role`),
  ADD KEY `tb_user_id_air_fkey` (`id_air`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tb_airline`
--
ALTER TABLE `tb_airline`
  MODIFY `id_air` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT untuk tabel `tb_role`
--
ALTER TABLE `tb_role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id_usr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  ADD CONSTRAINT `tb_user_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `tb_role` (`id_role`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_user_id_air_fkey` FOREIGN KEY (`id_air`) REFERENCES `tb_airline` (`id_air`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
