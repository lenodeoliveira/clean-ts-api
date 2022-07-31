import { badRequest, unauthorized, serverError, notFound, forbidden } from './components/'
import {
  apiKeyAuthSchema
} from './schemas/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  unauthorized,
  notFound,
  forbidden,
  serverError
}
