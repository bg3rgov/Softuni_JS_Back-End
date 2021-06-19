const { body } = require('express-validator');
const {User} = require('../models');
 
module.exports = [

    body('username', 'USERNAME COULD NOT BE EMPTY').notEmpty(),
    body('username').custom(isCreated),
    body('password', 'INCORRECT PASSWORD').isLength({min: 5}),
]


async function isCreated(username, {req}) {

    const user = await User.findOne({username: req.body.username});
    if(!user) {

        throw new Error ('USERNAME DOES NOT EXIST');
    }

    return true;
}