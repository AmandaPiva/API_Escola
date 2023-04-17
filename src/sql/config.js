import dotenv from 'dotenv/config'

export const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: 1433,
  options: {
      encrypt: true,
      trustServerCertificate: true,
      ssl: false // Desabilita a validação do certificado SSL
    }
}