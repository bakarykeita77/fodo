
let sql_projets = "\
CREATE TABLE IF NOT EXISTS `fodo`.`projets` ( \
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST , \
    `id_champs` INT NOT NULL ,\
    `no` VARCHAR(6) NOT NULL , \
    `taches` VARCHAR(300) NOT NULL , \
    `priorite` VARCHAR(6) NOT NULL , \
    `duree` VARCHAR(10) NOT NULL , \
    `debut` VARCHAR(50) NOT NULL , \
    `fin` VARCHAR(50) NOT NULL , \
    `moyen` VARCHAR(100) NOT NULL , \
    `personnel` VARCHAR(5) NOT NULL , \
    `cout` INT(16) NOT NULL , \
     PRIMARY KEY (`id`) \
) ENGINE = MyISAM CHARSET = utf8 COLLATE utf8_general_ci \
";

let sql_projets_list = "\
 CREATE TABLE IF NOT EXISTS `fodo`.`projets_list` ( \
   `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST ,\
    `projet_name` VARCHAR(255) NOT NULL , \
     PRIMARY KEY (`id`) \
) ENGINE = MyISAM CHARSET = utf8 COLLATE utf8_general_ci \
";

let sql_champs = "\
CREATE TABLE IF NOT EXISTS `fodo`.`champs` ( \
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST , \
  `id_lieu` int NOT NULL, \
  `culture` varchar(25) COLLATE 'utf8_general_ci' NOT NULL,\
  `superficie` varchar(25) COLLATE 'utf8_general_ci' NOT NULL \
) ENGINE = MyISAM CHARSET = utf8 COLLATE utf8_general_ci \
";

let sql_travaux = "\
CREATE TABLE IF NOT EXISTS `fodo`.`travaux` ( \
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST , \
  `id_champs` int NOT NULL, \
  `id_etape` int NOT NULL, \
  `date` varchar(50) COLLATE 'utf8_general_ci' NOT NULL, \
  `travail` varchar(250) COLLATE 'utf8_general_ci' NOT NULL, \
  `moyen` varchar(50) COLLATE 'utf8_general_ci' NOT NULL, \
  `quantite` int NOT NULL, \
  `duree` int NOT NULL, \
  `cout` int NOT NULL \
) ENGINE = MyISAM CHARSET = utf8 COLLATE utf8_general_ci \
";
