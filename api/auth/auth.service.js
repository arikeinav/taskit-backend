const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
// const logger = require('../../services/logger.service')

const saltRounds = 10

module.exports = {
    signup,
    login,
}

async function login(userName, password) {
    // logger.debug(`auth.service - login with userName: ${userName}`)
    if (!userName || !password) return Promise.reject('userName and password are required!')

    const user = await userService.getByUserName(userName)
    if (!user) return Promise.reject('Invalid userName or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid userName or password')

    delete user.password;
    return user;
}
async function signup(userName, password) {
    // logger.debug(`auth.service - signup with email: ${email}, username: ${username}`)
    if (!password || !userName) return Promise.reject('userName and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({userName, password: hash})
}

