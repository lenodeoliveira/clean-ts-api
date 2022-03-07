# Responder enquete

> ## Caso de sucesso
1. :x: Recebe uma requisição do tipo PUT na rota /api/surveys/{survey_id}/results
2. :x: Valida se a requisição foi feita por um usuário
3. :x: Valida o parâmetro survey_id
4. :x: Valida se o campo answer é uma resposta válida
5. :x: Cria um resultado de enquete com os dados fornecidos caso não tenha um registro
6. :x: Atualiza um resultado de enquete com os dados fornecidos caso já tenha um registro
7. :x: Retorna 200 com os dados do resultado da enquete

> ## Exceções
1. :x: Retorna erro 404 se a API não existir
2. :x: Retorna erro 403 se não for um usuário
3. :x: Retorna erro 403 se o survey_id passado na URL for inválido
4. :x: Retorna erro 403 se a resposta enviada pelo client for uma resposta inválida
5. :x: Retorna erro 500 se der erro ao tentar criar o resultado da enquete
6. :x: Retorna erro 500 se der erro ao tentar atualizar o resultado da enquete
7. :x: Retorna erro 500 se der erro ao tentar carregar a enquete