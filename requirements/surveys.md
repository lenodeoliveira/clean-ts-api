# Listar enquetes

> ## Caso de sucesso
1. :x: Recebe uma requisição do tipo **GET** na rota **/api/surveys**
1. :x: Valida se a requisição foi feita por um usuário
1. :x: Retorna 204 se não tiver nenhuma enquete
1. :x: Retorna 200 com os dados das enquetes

> ## Exceções
1. :x: Retorna erro 404 se a API não existir
1. :x: Retorna erro 403 se não for um usuário
1. :x: Retorna erro 500 se der erro ao tentar listar as enquetes
