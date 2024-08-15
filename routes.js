import express from 'express'
import sql from './database.js'

const router = express.Router()

router.get("/groups", async (req, res) => {
    try {
        const select = await sql`select * from Turmas where _status = 1 order by id desc`
        return res.status(200).json(select)
    } 
    catch (error) {
        return res.status(500).json('error to get all groups')
    }
})

router.post("/groups/new", async (req, res) => {
    try {
        const {nome} = req.body;
        await sql`insert into turmas(nome, _status) values(${nome}, 1)`
        return res.status(200).json('ok')
    } 
    catch (error) {
        return res.status(500).json('error in insert new group')
    }
})

router.put('/groups/:id', async (req, res) =>{
    try {
        const { nome } = req.body;
        const { id } = req.params; 
        await sql`update turmas set nome = ${nome} where id = ${id}`
        return res.status(200).json('ok')
    } catch (error) {
        return res.status(500).json('error in update gruop')
    }
})

router.delete('/groups/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        await sql`update turmas set _status = 0 where id = ${id}`
        return res.status(200).json('ok')
    } catch (error) {
        return res.status(500).json('error to delete group')
    }
})

router.get("/teams/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const select = await sql`select * from times where fk_turmas = ${id}`
        return res.status(200).json(select)
    } catch (error) {
        return res.status(500).json('error to get teams')
    }
})

router.post("/teams/new/:id", async (req, res) => {
    try {
        const { nome } = req.body;
        const { id } = req.params;
        await sql`insert into times(nome, fk_turmas) values(${nome}, ${id})`
        return res.status(200).json('ok')
    } catch (error) {
        return res.status(500).json('error in insert team')
    }
})

router.delete("/teams/:id", async(req, res)=>{
    try {
        const { id } = req.params;
        await sql`delete from times where id = ${id}`
        return res.status(200).json('ok')
    } catch (error) {
        return res.status(500).json('error to delete team')
    }
})

router.get("/teams/players/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const select = await sql`select * from jogadores where fk_time = ${id}`
        return res.status(200).json(select)
    } catch (error) {
        return res.status(500).json('error to get players')
    }
})

router.post("/teams/players/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {nome} = req.body;
        await sql`insert into jogadores(nome, fk_time) values(${nome},${id})`
        return res.status(200).json('ok')
    } catch (error) {
        return res.status(500).json('error to add player')
    }
})

router.delete("/teams/players/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        await sql`delete from jogadores where id = ${id}`;
        return res.status(200).json('ok')
    } catch (error) {
        return res.status(500).json('error to delete team')
    }
})

export default router