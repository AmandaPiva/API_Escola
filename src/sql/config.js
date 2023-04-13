export const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    pool:{ //numero de conexões que podem ser utilizadas no banco
        max: 10, //maximo de conexões
        min: 0, //minimo de conexões
        idTimeoutMillis: 30000 //tempo maximo em ms que uma conexão fica ociosa antes de ser encerrada
    },
    options:{
        encrypt: false, //a comunicação pode ser criptografada
        trustServerCertificate: true //pode conter um sertificado validado
    }
}