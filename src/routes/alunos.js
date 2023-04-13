//API REST dos alunos
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from '../sql/config'
import { defaultConfiguration } from 'express/lib/application'

const router = express.Router()

export default router

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