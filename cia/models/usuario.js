const mongoose = require("mongoose");
const Esquema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const usuarioEsquema = new Esquema({
    id: { type: String, unique: true },
    password: String,
    nombre: String,
    esProfesor: Boolean,
    clases: [{
        claseId: String
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

usuarioEsquema.pre('save', async function (next) {
    // 
    const usuario = this
    if (usuario.isModified('password')) {
        usuario.password = await bcrypt.hash(usuario.password, 8)
    }
    next()
})


usuarioEsquema.methods.generateAuthToken = async function() {
    // 
    const usuario = this
    const token = jwt.sign({_id: usuario._id}, "magia")
    usuario.tokens = usuario.tokens.concat({token})
    await usuario.save()
    return token
}

usuarioEsquema.statics.findByCredentials = async (id, password) => {
    // 
    const usuario = await usuario.findOne({id} )
    console.log(usuario.password)
    if (!usuario) {
        throw new Error({ error: 'Credenciales de acceso inválidas' })
    }
    const isPasswordMatch = await bcrypt.compare(password, usuario.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Credenciales de acceso inválidas' })
    }
    return usuario;
}

const usuario = mongoose.model('usuarios', usuarioEsquema)

module.exports = usuario