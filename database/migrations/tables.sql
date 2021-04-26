CREATE DATABASE IF NOT EXISTS web1;

USE web1;

CREATE TABLE IF NOT EXISTS usuario (
  id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nome varchar(100) NOT NULL,
  email varchar(100) UNIQUE KEY NOT NULL,
  senha varchar(512) NOT NULL,
  telefone varchar(11) NOT NULL,
  data_nasc date NOT NULL,
  cpf varchar(11) UNIQUE KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS sessao (
    token varchar(255) UNIQUE KEY NOT NULL,
    userId int(11) UNIQUE NOT NULL,
    expires date NOT NULL,
    PRIMARY KEY (token),
    FOREIGN KEY (userId) REFERENCES usuario(id)
); 