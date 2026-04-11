DROP TABLE IF EXISTS tb_pet;

DROP TABLE IF EXISTS tb_usuario;

DROP TABLE IF EXISTS tb_ong;

DROP type IF EXISTS status_pet;

CREATE type status_pet AS enum ('DISPONIVEL', 'ADOTADO');

CREATE TABLE tb_pet (
	id serial primary key,
	nome varchar not null,
	especie varchar not null,
	raca varchar not null,
	sexo char(1) not null check (sexo IN ('M', 'F')),
	porte char(1) not null check (porte IN ('P', 'M', 'G')),
	data_nascimento date not null,
	descricao text not null,
	url_imagem text not null,
	status status_pet not null,
	ong_id integer not null
);

CREATE TABLE tb_ong (
	id serial primary key,
	cnpj char(14) unique not null,
	razao_social varchar not null,
	nome_fantasia varchar not null,
	telefone char(11) not null,
	whatsapp char(13),
	email varchar unique not null,
	site varchar,
	cep char(8) not null,
	uf char(2) not null,
	cidade varchar not null,
	bairro varchar not null,
	logradouro varchar not null,
	numero integer not null
);

CREATE TABLE tb_usuario (id serial primary key, email varchar unique not null, senha varchar not null, ong_id integer unique not null);

ALTER TABLE tb_pet add constraint fk_pet_ong foreign key (ong_id) references tb_ong (id);

ALTER TABLE tb_usuario add constraint fk_usuario_ong foreign key (ong_id) references tb_ong (id);

INSERT INTO
	tb_ong (cnpj, razao_social, nome_fantasia, telefone, whatsapp, email, cep, uf, cidade, bairro, logradouro, numero, site)
VALUES
	(
		'12345678000199',
		'Associação Guardiões da Mata Atlântica',
		'EcoVida',
		'1133445566',
		'551133445566',
		'contato@ecovida.org.br',
		'01310100',
		'SP',
		'São Paulo',
		'Bela Vista',
		'Avenida Paulista',
		1500,
		null
	),
	(
		'98765432000188',
		'Associação dos Amantes de Animais',
		'Amigo Animal',
		'2122334455',
		null,
		'contato@amigoanimal.org.br',
		'20040002',
		'RJ',
		'Rio de Janeiro',
		'Centro',
		'Rua da Assembleia',
		10,
		'https://www.amigoanimal.org'
	);

INSERT INTO
	tb_pet (nome, especie, raca, sexo, porte, data_nascimento, descricao, url_imagem, status, ong_id)
VALUES
	(
		'Dogão',
		'Cão',
		'Pitbull',
		'M',
		'G',
		'2025-02-01',
		'Cão grande, amigável e preguiçoso',
		'http://esselinkseraverdadeiroalgumdia.com',
		'DISPONIVEL',
		1
	),
	(
		'Sujinho',
		'Gato',
		'Siamês',
		'M',
		'M',
		'2024-05-01',
		'Gato muito enérgico',
		'http://esselinkseraverdadeiroalgumdia.com',
		'DISPONIVEL',
		1
	),
	(
		'Pipo',
		'Ave',
		'Calopsita',
		'M',
		'P',
		'2024-01-10',
		'Assovia o hino do time e é muito manso.',
		'http://esselinkseraverdadeiroalgumdia.com',
		'DISPONIVEL',
		1
	),
	(
		'Stuart',
		'Roedor',
		'Hamster Sírio',
		'M',
		'P',
		'2024-11-20',
		'Adora correr na rodinha durante a noite.',
		'http://esselinkseraverdadeiroalgumdia.com',
		'DISPONIVEL',
		2
	),
	(
		'Rex',
		'Cão',
		'Pastor Alemão',
		'M',
		'G',
		'2021-03-30',
		'Ótimo para guarda, mas muito carinhoso.',
		'http://esselinkseraverdadeiroalgumdia.com',
		'DISPONIVEL',
		2
	),
	(
		'Lola',
		'Coelho',
		'Mini Lop',
		'F',
		'P',
		'2023-06-05',
		'Muito fofa, adora comer cenoura e feno.',
		'http://esselinkseraverdadeiroalgumdia.com',
		'ADOTADO',
		2
	),
	(
		'Zazu',
		'Ave',
		'Papagaio Verdadeiro',
		'M',
		'M',
		'2020-05-30',
		'Fala "bom dia" e imita o som do telefone.',
		'http://esselinkseraverdadeiroalgumdia.com',
		'DISPONIVEL',
		1
	),
	(
		'Dino',
		'Réptil',
		'Iguana Verde',
		'M',
		'G',
		'2022-09-12',
		'Exige cuidados especiais e aquecimento.',
		'http://esselinkseraverdadeiroalgumdia.com',
		'DISPONIVEL',
		2
	),
	(
		'Amora',
		'Roedor',
		'Porquinho da Índia',
		'F',
		'P',
		'2024-03-18',
		'Conversa fazendo barulhinhos quando vê comida.',
		'http://esselinkseraverdadeiroalgumdia.com',
		'DISPONIVEL',
		1
	),
	(
		'Nemo',
		'Peixe',
		'Peixe-Palhaço',
		'M',
		'P',
		'2025-01-01',
		'Precisa de aquário marinho estabilizado.',
		'http://esselinkseraverdadeiroalgumdia.com',
		'ADOTADO',
		2
	);

INSERT INTO
	tb_usuario (email, senha, ong_id)
VALUES
	('jonas@ecovida.org.br', 'EssaSenhaSeraCriptografadaEmBreve', 1),
	('raquel@amigoanimal.org.br', 'EssaSenhaSeraCriptografadaEmBreve', 2);