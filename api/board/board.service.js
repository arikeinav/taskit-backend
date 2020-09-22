
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    update,
    remove,
    add
}

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('board')
    try {
        const boards = await collection.find().toArray();
        console.log('enter to boards');

        // const reviews = await collection.find(criteria).toArray();
        // var reviews = await collection.aggregate([
        //     {
        //         $match: filterBy
        //     },
        //     {
        //         $lookup:
        //         {
        //             from: 'user',
        //             localField: 'byUserId',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     {
        //         $unwind: '$byUser'
        //     },
        //     {
        //         $lookup:
        //         {
        //             from: 'user',
        //             localField: 'aboutUserId',
        //             foreignField: '_id',
        //             as: 'aboutUser'
        //         }
        //     },
        //     {
        //         $unwind: '$aboutUser'
        //     }
        // ]).toArray()

        // reviews = reviews.map(review => {
        //     review.byUser = { _id: review.byUser._id, username: review.byUser.username }
        //     review.aboutUser = { _id: review.aboutUser._id, username: review.aboutUser.username }
        //     delete review.byUserId;
        //     delete review.aboutUserId;
        //     return review;
        // })
        return boards
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}
async function getById(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) })
        console.log('enter to one board');

        // delete user.password

        // user.givenReviews = await reviewService.query({ byUserId: ObjectId(user._id) })
        // user.givenReviews = user.givenReviews.map(review => {
        // delete review.byUser
        return board
    } catch (err) {
        console.log(`ERROR: while finding board ${boardId}`)
        throw err;
    }
}
async function update(board) {
    const collection = await dbService.getCollection('board')
    board._id = ObjectId(board._id);
    try {
        await collection.replaceOne({ "_id": board._id },  board )
        return board
    } catch (err) {
        console.log(`ERROR: cannot update board ${board._id}`)
        throw err;
    }
}
async function remove(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        console.log(`ERROR: cannot remove board ${boardId}`)
        throw err;
    }
}
async function add(board) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.insertOne( board )
    } catch (err) {
        console.log(`ERROR: cannot add board`)
        throw err;
    }
}

// async function add(review) {
//     review.byUserId = ObjectId(review.byUserId);
//     review.aboutUserId = ObjectId(review.aboutUserId);

//     const collection = await dbService.getCollection('review')
//     try {
//         await collection.insertOne(review);
//         return review;
//     } catch (err) {
//         console.log(`ERROR: cannot insert user`)
//         throw err;
//     }
// }

// function _buildCriteria(filterBy) {
//     const criteria = {};
//     return criteria;
// }


