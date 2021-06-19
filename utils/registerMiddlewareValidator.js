const { body } = require('express-validator');
const { User } = require('../models');
 
module.exports = [

    body('username', 'USERNAME COULD NOT BE EMPTY').notEmpty(),
    body('username', 'USERNAME SHOULD INCLUDE ONLY ENGLISH LETTERS AND DIGITS').isAlphanumeric(),
    body('username', 'USERNAME SHOULD BE AT LEAST 5 CHARACTERS LONG').isLength({min: 5}),
    body('password', 'PASSWORD COULD NOT BE EMPTY').notEmpty(),
    body('password', 'PASSWORD SHOULD INCLUDE ONLY ENGLISH LETTERS AND DIGITS').isAlphanumeric(),
    body('password', 'PASSWORD SHOULD BE AT LEAST 5 CHARACTERS LONG').isLength({min: 5}),
    body('repeatPassword').custom(customPasswordCheck)

]

// function isUnique(email, {req}) {

//     User.find({email: email}).then(user => {

//         if(user) {

//             throw new Error ('The given email is already in use')
//         }

//         return true;
//     })
// }

function customPasswordCheck(repeatPassword, {req}) {

    if(repeatPassword !== req.body.password) {

        throw new Error ('REPEAT PASSWORD IS NOT EQUAL TO PASSWORD')
    }

    return true;
}