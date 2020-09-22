const logger = require('../../services/logger.service')
const boardService = require('./board.service')

// TODO: needs error handling! try, catch

module.exports = {
    getBoards,
    getBoard,
    updateBoard,
    deleteBoard,
    addBoard
}

async function getBoards(req, res) {
    const boards = await boardService.query(req.query)
    res.send(boards)
}
async function getBoard(req, res) {
    const board = await boardService.getById(req.params.id)
    res.send(board)
}
async function updateBoard(req, res) {
    const board = req.body;
    await boardService.update(board)
    res.send(board)
}
async function addBoard(req, res) {
    const board = req.body;
    await boardService.add(board)
    res.send(board)
}
async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete board', err);
        res.status(500).send({ error: 'cannot delete board' })
    }
}

// async function addReview(req, res) {
//     var review = req.body;
//     review.byUserId = req.session.user._id;
//     review = await reviewService.add(review)
//     // review.byUser = req.session.user;
//     // TODO - need to find aboutUser
//     // review.aboutUser = {}
//     res.send(review)
// }
