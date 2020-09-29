const authService = require('./auth.service')
const logger = require('../../services/logger.service')


module.exports = {
    login,
    signup,
    logout
}

async function login(req, res) {
    const { userName, password } = req.body
    
    try {
        const user = await authService.login(userName, password)
        // req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}
async function signup(req, res) {
    try {
        const { password, userName } = req.body
        // logger.debug(userName + ', ' + password)
        const account = await authService.signup(userName, password)

        // logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(userName, password)
        // req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('[SIGNUP]' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}
async function logout(req, res){
    try {
        // req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

