import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/roupa', (request, reply) => {
    const {titulo, tamanho, tipo, cor} = request.body
   // console.log(body)
   // return 'cadastrar'
    database.create({
        titulo: titulo,
        tamanho: tamanho,
        tipo: tipo,
        cor: cor
    })

    return reply.status(201).send
})

server.get('/roupa', (request) => {
    const search = request.query.search
    console.log(search)
    const roupas = database.list(search)
   // console.log(roupas)
    return roupas
})

server.put('/roupas/:id', (request, reply) => {
    const roupaId = request.params.id
    const {titulo, tamanho, tipo, cor} = request.body
    const roupa = database.update(roupaId, {
        titulo: titulo,
        tamanho: tamanho,
        tipo: tipo,
        cor: cor
    })
    return reply.status(204).send()
})

server.delete("/roupas/:id", (request, reply) => {
    const roupaId = request.params.id

    database.delete(roupaId)

    return reply.status(204).send()
})
server.listen({
    port: 3333,
})