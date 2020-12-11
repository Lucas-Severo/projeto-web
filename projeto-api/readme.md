# Configuração api

## Requisitos
- Postgresql
- Nodejs >= 12.x

## Configuração de níveis e permissões

Configurar os níveis e permissões (public e authenticated) da seguinte forma

Para configurar os perfis e permissões, utilize o arquivo que está na pasta readme [permissions.csv](./readme/permissions.csv)

Para isso siga os passos:

1. Entre no banco de dados

`psql -h 127.0.0.1 -p 5432 -d nome_banco -U usuario -W`

Dê enter e digite a senha

2. Apague as informações da tabela de permissões

`DELETE FROM "users-permissions_permission";`

3. Copie as informações para a tabela de permissões

*/path/to/ = Caminho absoluto até o arquivo de permissões*

`COPY "users-permissions_permission" FROM '/path/to/readme/permissions.csv' DELIMITER ',' NULL AS 'null' csv;`

Com isso todas as configurações necessárias de perfis e permissões no sistema já estarão configuradas