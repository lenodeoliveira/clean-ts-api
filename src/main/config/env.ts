export default {
  mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj670==5H'
}

// mongodb+srv://lennon-oliveira:<foVMTYSSHnW&29>@cluster0.k2yhn.mongodb.net/clean-node-api?retryWrites=true&w=majority
