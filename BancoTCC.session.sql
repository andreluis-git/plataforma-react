-- select * from tema t inner join usuario u on t.criador_tema_id = (select id from usuario us where us.email = 'aluno0@email.com');


-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;


-- select * from aluno_candidaturas

-- select t.descricao as dc from tema t INNER JOIN
-- aluno_candidaturas ac on ac.tema_id = t.id
-- WHERE ac.aluno_id = 6

-- select * from tema t where t.id = 1

-- select * from usuario u where u.nome = 'Aluno1'
-- update usuario set sobre = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry.' where id = 6
-- update usuario set sobre = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley.' where id = 7


-- SELECT * FROM (select DISTINCT t.* from tema t JOIN tema_disciplina td ON td.tema_id = t.id WHERE td.disciplina_id IN (:ids) AND t.criador_tema_id != :criadorId ORDER BY id DESC) tb1
-- UNION ALL
-- SELECT * FROM (select DISTINCT t.* from tema t JOIN tema_disciplina td ON td.tema_id = t.id WHERE td.disciplina_id NOT IN (:ids) AND t.criador_tema_id != :criadorId ORDER BY id DESC) tb2

-- SELECT * FROM tema t WHERE (t.titulo LIKE CONCAT('%',Teste,'%') OR t.descricao LIKE CONCAT('%',Teste,'%')) AND t.criador_tema_id != :criadorId ORDER BY t.id DESC;

select * from tema t JOIN aluno_candidaturas ac on ac.tema_id = t.id WHERE ac.aluno_id = :alunoId AND (t.titulo LIKE CONCAT('%',:texto,'%') OR t.descricao LIKE CONCAT('%',:texto,'%'))

select * from tema t where t.criador_tema_id = :alunoId AND (t.titulo LIKE CONCAT('%',:texto,'%') OR t.descricao LIKE CONCAT('%',:texto,'%'))


select * from tema_candidatos al

select * from tema t where ativo = true

select * from usuario

select * from curso

select * from disciplina

select * from aluno_disciplina ad 
left join tema_disciplina td on td.disciplina_id = ad.disciplina_id 
left join disciplina d on ad.disciplina_id = d.id 
where d.id = 2;

-- update usuario set password = '$2a$10$BrGGlt4Eg8SIfUqy84/QKun3tz8ERMXbMjJ7NcoLKIFiBQ9r0zrs2' where id = 3

select * from usuario u
join curso c on c.id = u.curso_aluno_id and c.instituicao_curso_id = 3
where (u.email like CONCAT('%','aluno0','%'))

select * from disciplina d where d.curso_disciplina_id = 7 -- VERIFICAR SE A DISCIPLINA DO CURSO FOI DELETADA JUNTO

select * from disciplina d where d.curso_disciplina_id = 2 
select * from usuario u where u.curso_aluno_id = 2 -- VERIFICAR SE O ALUNO FOI DELETADO JUNTO COM O CURSO

SELECT * FROM (select DISTINCT t.* from tema t LEFT JOIN tema_disciplina td ON td.tema_id = t.id WHERE (td.disciplina_id NOT IN (1) OR td.disciplina_id IS NULL) AND t.criador_tema_id != 1 AND t.ativo = true ORDER BY id DESC) tb2

select * from tema

select DISTINCT t.* from tema t LEFT JOIN tema_disciplina td ON td.tema_id = t.id


SELECT * FROM (select DISTINCT t.* from tema t LEFT JOIN tema_disciplina td ON td.tema_id = t.id WHERE (td.disciplina_id NOT IN () OR td.disciplina_id IS NULL) AND t.criador_tema_id != 46 AND t.ativo = true ORDER BY id DESC) tb2

select DISTINCT t.id from tema t JOIN tema_disciplina td ON td.tema_id = t.id WHERE td.disciplina_id IN (:ids) AND t.criador_tema_id != :criadorId AND t.ativo = true ORDER BY id DESC

select * from usuario order by id asc

select * 
FROM tema t 
LEFT JOIN (SELECT tc.* FROM tema_candidatos tc
JOIN usuario u ON u.id = tc.aluno_id and u.ativo = true) tc on tc.tema_id = t.id
WHERE t.criador_tema_id = 5
ORDER BY t.id DESC


select * from tema_candidatos
