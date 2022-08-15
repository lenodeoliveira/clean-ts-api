export const surveyResultPath = {
  put: {
    security: [{
      apiKeyAuth: [] as any
    }],
    tags: ['Enquetes'],
    summary: 'API para criar a resposta de uma enquete',
    description: 'Essa rota só pode ser executada por usuário autenticado',
    parameters: [{
      in: 'path',
      name: 'surveyId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/saveSurveyParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  get: {
    security: [{
      apiKeyAuth: [] as any
    }],
    tags: ['Enquetes'],
    summary: 'API para consultar o resultado de uma enquete',
    description: 'Essa rota só pode ser executada por usuário autenticado',
    parameters: [{
      in: 'path',
      name: 'surveyId',
      description: 'ID da enquete a ser respondida',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
