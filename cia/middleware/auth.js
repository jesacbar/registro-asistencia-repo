const jwt = require('jsonwebtoken')
const Profesor = require('../models/profesor')

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, "magia")
    try {
        const profesor = await Profesor.findOne({ _id: data._id, 'tokens.token': token })
        if (!profesor) {
            throw new Error()
        }
        req.profesor = profesor
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'No está autorizado para ver este recurso.' })
    }

}
module.exports = auth