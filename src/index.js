//ADICIONANDO UMA PORTA PRINCIPAL PARA O SERVIDOR
import express from 'express';
import cors from 'cors';
import rotasAluno from './routes/alunos.js'
import rotasProfessor from './routes/professores.js'

const app = express(); //instanciando o express
const port = 4000; //nossa porta principal

app.use(cors()) //habilitando a cors que evita ao navegador a bloquear recursos de outro dominio
app.use(express.urlencoded({extended: true}));
app.use(express.json())

/*
 * Rotas do aluno
 */
app.use('/api/aluno', rotasAluno)
app.use('/api/professores', rotasProfessor)
/**
 * Rotas públicas
 */

app.use('/', express.static('public'));

/**
 * Criando rota default da API
 */

app.get('/api', (req, res) => {
    res.status(200).json({
        mensagem: 'API 100% funcional',
        versao: '1.0.0'
    })
})

/**
 * Rota para o erro 404
 */

app.use(function(req, res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})


app.listen(port, function(){
    console.log(`Servidor rodando na porta ${port}`);
})

