SET GLOBAL innodb_fast_shutdown
= 0;

CREATE SCHEMA
`banco_teste_gerencia_tb3` DEFAULT CHARACTER
SET latin1;

CREATE TABLE `banco_teste_gerencia_tb3`.`usuarios`
(
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR
(45) NULL,
  PRIMARY KEY
(`id`))
  ;

