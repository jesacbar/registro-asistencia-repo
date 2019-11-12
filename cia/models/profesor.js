const mongoose = require("mongoose");
const Esquema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const profEsquema = new Esquema({
    id: String,
    pass: String,
    nombre: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

profEsquema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const profesor = this
    if (profesor.isModified('pass')) {
        profesor.pass = await bcrypt.hash(profesor.pass, 8)
    }
    next()
})


profEsquema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const profesor = this
    const token = jwt.sign({_id: profesor._id}, "magia")
    profesor.tokens = profesor.tokens.concat({token})
    await profesor.save()
    return token
}

profEsquema.statics.findByCredentials = async (id, pass) => {
    // 
    const profesor = await Profesor.findOne({id} )
    console.log(profesor.pass)
    if (!profesor) {
        throw new Error({ error: 'Credenciales de acceso inválidas' })
    }
    const isPasswordMatch = await bcrypt.compare(pass, profesor.pass)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Credenciales de acceso inválidas' })
    }
    return profesor;
}

const Profesor = mongoose.model('profesores', profEsquema)

module.exports = Profesor