//API REST dos alunos
import express from 'express'
import sql, {pool} from 'mssql'
import { sqlConfig } from '../sql/config'


const router = express.Router()

/**
 * listando os alunos
 */

router.get('/', (req, res) => {
    try{
        sql.connect(sqlConfig).then(pool =>{
            return pool. request()
            .execute('SP_S_ALL_ALUNO')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    }
    catch(err){
        console.error(`Erro ao conectar ${err.message}`)
    }
})

/**
 * Inserindo um novo aluno
 */

router.post('/', (req, res) => {
    const {ra, nome, cpf, dataNasc} = 
        req.body
    return pool.request()
        .input('RA', sql.Int, ra)
        .input('NOME', sql.VarChar(50), nome)
        .input('CPF', sql.Char(20), cpf)
        .input('DATANASCI', sql.Date, dataNasc)
        .execute('SP_I_ESC_ALUNO')
}).then(dados => {
    res.status(200).json(dados.output)

}).catch(err => {
    res.status(400).json(err.message)
})

/**
 * Altera um veículo existente
 */

router.put("/", (req,res) =>{
    const {ra, nome, cpf, dataNasc} = req.body
    return pool.request()
        .input('RA', sql.Int, ra)
        .input('NOME', sql.VarChar(50), nome)
        .input('CPF', sql.Char(20), cpf)
        .input('DATANASCI', sql.Date, dataNasc)
        .execute('SP_UP_ESC_ALUNO')        
}).then(dados => {
    res.status(200).json(`Aluno ${ra} alterado com sucesso`);
}).catch(err => {
    res.status(400).json(err.message)
})

/**
 * Deletando um aluno
 */

router.delete(':/ra', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const ra = req.params.ra
        return pool.request()
        .input('RA', sql.Int, ra)
        .execute('SP_D_ESC_ALUNO')
    }).then(dados => {
        res.status(200).json(`Aluno ${ra} removido com sucesso`)
    }).catch(err => {
        res.status(400).json(err.message0)
    })
})

export default router;