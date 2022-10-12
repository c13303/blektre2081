-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 12 oct. 2022 à 15:04
-- Version du serveur : 10.3.23-MariaDB-0+deb10u1
-- Version de PHP : 7.3.21-1+0~20200807.66+debian10~1.gbp18a1c2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blektre2081`
--

-- --------------------------------------------------------

--
-- Structure de la table `persos`
--

CREATE TABLE `persos` (
  `nom` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `player_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `players`
--

CREATE TABLE `players` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `players`
--

INSERT INTO `players` (`id`, `name`, `password`, `data`) VALUES
(9, 'ours', 'ae0bec9e9d33c56354bd612c8a6010840324fc5b9786ce0a18b696b304b09397', '{}'),
(10, 'ours3', 'ae0bec9e9d33c56354bd612c8a6010840324fc5b9786ce0a18b696b304b09397', '{}'),
(11, 'fufu', 'ae0bec9e9d33c56354bd612c8a6010840324fc5b9786ce0a18b696b304b09397', '{}'),
(12, 'julours', 'ae0bec9e9d33c56354bd612c8a6010840324fc5b9786ce0a18b696b304b09397', '{}'),
(13, 'petitcon', 'ae0bec9e9d33c56354bd612c8a6010840324fc5b9786ce0a18b696b304b09397', '{\"name\":\"petitcon\",\"id\":13}'),
(14, 'janpol', 'ae0bec9e9d33c56354bd612c8a6010840324fc5b9786ce0a18b696b304b09397', '{}'),
(15, 'blog', '26429a356b1d25b7d57c0f9a6d5fed8a290cb42374185887dcd2874548df0779', '{}'),
(16, 'babal', 'ae0bec9e9d33c56354bd612c8a6010840324fc5b9786ce0a18b696b304b09397', '{}'),
(17, 'caca', 'ae0bec9e9d33c56354bd612c8a6010840324fc5b9786ce0a18b696b304b09397', '{}');

-- --------------------------------------------------------

--
-- Structure de la table `world`
--

CREATE TABLE `world` (
  `nom` varchar(10) NOT NULL,
  `data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `world`
--

INSERT INTO `world` (`nom`, `data`) VALUES
('main_world', '{\"roles\":{\"DIRECTOR\":{\"nom\":\"manuel_valse\"},\"STAGIAIRE\":{\"nom\":\"florence_parly2\"},\"INFLUENCE\":{\"nom\":\"florence_parly2\"},\"DJ\":{\"nom\":\"manuel_valse\",\"tube\":\"<em><b>KIF ME BB</b></em>\"},\"COCHON\":{\"nom\":\"charles_padqua\"},\"SERVEUR\":{\"nom\":\"manuel_valse\"},\"SECRETAIRE\":{\"nom\":\"florence_parly2\"},\"RAEL\":{\"nom\":\"manuel_valse\"},\"PHARMACIEN\":{\"nom\":\"florence_parly2\"},\"VIGILE\":{\"nom\":\"manuel_valse\"},\"MENDIANT\":{\"nom\":\"manuel_valse\"},\"BEZOS\":{\"nom\":\"manuel_valse\"}},\"suicides\":{}}');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `persos`
--
ALTER TABLE `persos`
  ADD PRIMARY KEY (`nom`);

--
-- Index pour la table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `world`
--
ALTER TABLE `world`
  ADD PRIMARY KEY (`nom`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
