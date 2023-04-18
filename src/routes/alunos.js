//API REST dos alunos
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from '../sql/config.js'


const router = express.Router()

/**
 * listando apenas os alunos efetuando o filtro
 */

router.get('/', (req, res) => {
    try {
        const filtro = '' 
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
            .input('FILTRO', sql.VarChar(100), filtro)
                .execute('SP_S_ESC_ALUNO')
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
 * listando apenas os alunos efetuando o filtro
 */

router.get('/:filtro', (req, res) => {
    try {
        const filtro = req.params.filtro 
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
            .input('FILTRO', sql.VarChar(100), filtro)
                .execute('SP_S_ESC_ALUNO')
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
 * Inserindo um novo aluno
 */

router.post('/', (req, res) => {
    sql.connect(sqlConfig).then(pool => {

        const { ra, nome, cpf, dataNasc } =
            req.body
            return pool.request()
            .input('NOME', sql.VarChar(50), nome)
            .input('CPF', sql.Char(20), cpf)
            .execute('SP_I_ESC_ALUNO')
    }).then(dados => {
        res.status(200).json(dados.output)

    }).catch(err => {
        res.status(400).json(err.message)
    })
})
/**
 * Altera um aluno existente
 */

router.put("/", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const { ra, nome, cpf} = req.body
        return pool.request()
            .input('RA', sql.Int, ra)
            .input('NOME', sql.VarChar(50), nome)
            .input('CPF', sql.Char(20), cpf)
            .execute('SP_U_ESC_ALUNO')
    }).then(dados => {
        res.status(200).json(`Aluno ${ra} alterado com sucesso`);
    }).catch(err => {
        res.status(400).json(err.message)
    })
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
        res.status(400).json(err.message)
    })
})

export default router;