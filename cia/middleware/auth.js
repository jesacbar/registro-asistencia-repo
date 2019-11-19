const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const auth = async(req, res, next) => {
    const header = req.header('Authorization')
    if (typeof header !== 'undefined') {
        const token = header.replace('Bearer ', '')
        const data = jwt.verify(token, "magia")
        try {
            const usuario = await Usuario.findOne({ _id: data._id, 'tokens.token': token })
            if (!usuario) {
                throw new Error()
            }
            req.usuario = usuario
            req.token = token
            next()
        } catch (error) {
            res.status(401).send({ error: 'No está autorizado para ver este recurso.' })
        }
    } else {
        res.status(401).send({ error: 'No está autorizado para ver este recurso.' })
    }
}
module.exports = auth