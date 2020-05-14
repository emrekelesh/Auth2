const {Schema, model} = require('mongoose')
const { hash, compareSync } = require('bcrypt-nodejs')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true,
        trim: true
    },
    name: String,
    age: {
        type: Number,
        min: 0,
        max: 100,

    },
    password: String,
    isAdmin: Boolean

}, { timestamps: true })


userSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified('password')) return next()
    hash(user.password, null, null, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
    })
})
userSchema.methods.comparePassword = function (password) {
    return compareSync(password, this.password)
}
module.exports = model('User', userSchema)
