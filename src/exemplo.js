import sql from 'mssql'

const config = {
  user: 'Escola',
  password: 'admin123',
  server: 'localhost\\SQLEXPRESS',
  database: 'ESCOLA', 
  port: 49686,
  options: {
      encrypt: true,
      trustServerCertificate: true,
      ssl: false // Desabilita a validação do certificado SSL
    }
};


sql.connect(config).then(() => {
  console.log('Conexão bem sucedida!');
}).catch((err) => {
  console.error('Erro ao conectar:', err);
});
