//API REST dos alunos
import express from 'express'
import sql, {pool} from 'mssql'
import { sqlConfig } from '../sql/config'
import { defaultConfiguration } from 'express/lib/application'

const router = express.Router()

/**
 * listando os professores
 */

router.get('/', (req, res) => {
    try{
        sql.connect(sqlConfig).then(pool =>{
            return pool. request()
            .execute('SP_S_ALL_PROFESSOR')
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
 * Inserindo um novo professor
 */

router.post('/', (req, res) => {
    const {rf, nome, cpf, dataNasc ,especialidade} = 
        req.body
    return pool.request()
        .input('RF', sql.Int, rf)
        .input('NOME', sql.VarChar(50), nome)
        .input('CPF', sql.Char(20), cpf)
        .input('DATANASCI', sql.Date, dataNasc)
        .input('ESPECIALIDADE', sql.VarChar(50), especialidade)
        .execute('SP_I_ESC_PROFESSOR')
}).then(dados => {
    res.status(200).json(dados.output)

}).catch(err => {
    res.status(400).json(err.message)
})

/**
 * Altera um professor existente
 */

router.put("/", (req,res) =>{
    const {rf, nome, cpf, dataNasc ,especialidade} = req.body
    return pool.request()
    .input('RF', sql.Int, rf)
    .input('NOME', sql.VarChar(50), nome)
    .input('CPF', sql.Char(20), cpf)
    .input('DATANASCI', sql.Date, dataNasc)
    .input('ESPECIALIDADE', sql.VarChar(50), especialidade)
        .execute('SP_UP_ESC_PROFESSOR')        
}).then(dados => {
    res.status(200).json(`Professor ${rf} alterado com sucesso`);
}).catch(err => {
    res.status(400).json(err.message)
})

/**
 * Deletando um professor
 */

router.delete(':/rf', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const ra = req.params.ra
        return pool.request()
        .input('RF', sql.Int, rf)
        .execute('SP_D_ESC_PROFESSOR')
    }).then(dados => {
        res.status(200).json(`Professor ${ra} removido com sucesso`)
    }).catch(err => {
        res.status(400).json(err.message0)
    })
})

export default router;