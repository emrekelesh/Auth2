const router = require('express')()
const User = require('./user')

router.route('/')
    .get((req, res) => {
        User.find({}, 'name age email').then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
    })
    .post((req, res) => {
        const data = req.body
        data.isAdmin = false
        User.create(data).then(result => {
            res.json(result)
        })
    })
router.route('/login').post(async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({ email })
    if (!user) {
        await res.status(400).json({error: 'kullanıcı bulunmuyor'})
        return
    }

    if (!user.comparePassword(password))
        return res.status(400).json({ error: 'hatalı şifre' })

    await res.json(user)
})

router.route('/:id')
    .get((req, res) => {
        const { id } = req.params
        User.findById(id).then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
    })
    .delete((req, res) => {
        const { id } = req.params
        User.findByIdAndDelete(id).then(result => {
            res.json(result)
        })
    })
    .put((req, res) => {
        const { id } = req.params
        const data = req.body
        User.findByIdAndUpdate(id, data).then(result => {
            res.json(result)
        })
    })


module.exports = router
