/* eslint-disable @typescript-eslint/no-floating-promises */
import typeDefs from '@/main/graphql/type-defs'
import resolvers from '@/main/graphql/resolvers'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { Express } from 'express'

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  response.data = undefined
  errors?.forEach(error => {
    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
    } else if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
    } else if (checkError(error, 'ApolloError')) {
      response.http.status = 500
    }
  })
}

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name , error.originalError?.name].some(name => name === errorName)
}

export default (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [{
      requestDidStart: async () => ({
        willSendResponse: async ({ response, errors }) => handleErrors(response, errors)
      })
    }]
  })

  server.start().then(res => {
    server.applyMiddleware({ app })
  })
}
