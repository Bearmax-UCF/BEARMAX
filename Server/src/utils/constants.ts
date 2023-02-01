export default {
  port: process.env.PORT || 8080,
  mongo_uri: process.env.MONGO_URI || "mongodb://localhost/test",
  mongo_db: process.env.MONGO_DB || "test",
  isProduction: process.env.NODE_ENV === 'production',
  secret_key: process.env.SECRET_KEY || "dontkeepme",
  bcrypt_log_rounds: Number(process.env.BCRYPT_LOG_ROUNDS) || 10,
  token_expires_in: process.env.TOKEN_EXPIRES_IN || "12h",
};
