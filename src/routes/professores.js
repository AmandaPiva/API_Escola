//API REST dos alunos
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from '../sql/config.js'

const router = express.Router()

/**
 * listando os professores
 */

router.get('/', (req, res) => {
    try {
         const filtro = '' 
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
            .input('FILTRO', sql.VarChar(100), filtro)
                .execute('SP_S_ESC_PROFESSOR')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    }
    catch (err) {
        console.error(`Erro ao conectar ${err.message}`)
    }
})

router.get('/:filtro', (req, res) => {
    try {
         const filtro = req.params.filtro 
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
            .input('FILTRO', sql.VarChar(100), filtro)
                .execute('SP_S_ESC_PROFESSOR')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    }
    catch (err) {
        console.error(`Erro ao conectar ${err.message}`)
    }
})

/**
 * Inserindo um novo professor
 */

router.post('/', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const { nome, cpf, especialidade } =
            req.body
        return pool.request()
            .input('NOME', sql.VarChar(50), nome)
            .input('CPF', sql.Char(20), cpf)
            .input('ESPECIALIDADE', sql.VarChar(50), especialidade)
            .execute('SP_I_ESC_PROFESSOR')
    }).then(dados => {
        res.status(200).json(dados.output)

    }).catch(err => {
        res.status(400).json(err.message)
    })
})

/**
 * Altera um professor existente
 */

router.put("/", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const { rf, nome, cpf, especialidade } = req.body
        return pool.request()
            .input('RF', sql.Int, rf)
            .input('NOME', sql.VarChar(50), nome)
            .input('CPF', sql.Char(20), cpf)
            .input('ESPECIALIDADE', sql.VarChar(50), especialidade)
            .execute('SP_U_ESC_PROFESSOR')
    }).then(dados => {
        res.status(200).json(`Professor ${rf} alterado com sucesso`);
    }).catch(err => {
        res.status(400).json(err.message)
    })
})

/**
 * Deletando um professor
 */

router.delete('/', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const {rf} = req.body; 

        return pool.request()
            .input('RF', sql.Int, rf)
            .execute('SP_D_ESC_PROFESSOR')
    }).then(dados => {
        res.status(200).json(`Professor ${rf} removido com sucesso`)
    }).catch(err => {
        res.status(400).json(err.message)
    })
})

export default router;