const jwt = require ('jsonwebtoken')


const authentication = async function (req, res, next) {
    try {
        const token = req.headers['auth-key']
        if (!token) return res.status(400).send({ msg: "please provide token" })

        jwt.verify(token, "Assignment1" , (err, user) => {

            if (err) { return res.status(401).send("failed authenticaton") };
            
            next()

        })
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
}

module.exports.authentication = authentication