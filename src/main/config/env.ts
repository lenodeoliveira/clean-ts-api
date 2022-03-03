// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
export default {
  mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj670==5H'
}
