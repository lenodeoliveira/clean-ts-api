# Responder enquete

> ## Caso de sucesso
1. :x: Recebe uma requisição do tipo **PUT** na rota **/api/surveys/{survey_id}/results**
1. :x: Valida se a requisição foi feita por um usuário
1. :x: Valida o parâmetro **survey_id**
1. :x: Valida se o campo **answer** é uma resposta válida
1. :x: **Cria** um resultado de enquete com os dados fornecidos caso não tenha um registro
1. :x: **Atualiza** um resultado de enquete com os dados fornecidos caso já tenha um registro
1. :x: Retorna **200** com os dados do resultado da enquete

> ## Exceções
1. :x: Retorna erro **404** se a API não existir
1. :x: Retorna erro **403** se não for um usuário
1. :x: Retorna erro **403** se o survey_id passado na URL for inválido
1. :x: Retorna erro **403** se a resposta enviada pelo client for uma resposta inválida
1. :x: Retorna erro **500** se der erro ao tentar criar o resultado da enquete
1. :x: Retorna erro **500** se der erro ao tentar atualizar o resultado da enquete
1. :x: Retorna erro **500** se der erro ao tentar carregar a enquete