const { body } = require('express-validator');

 
module.exports = [

    body('title', 'TITLE IS REQUIRED').notEmpty(),
    body('title', 'TITLE SHOULD BE AT LEASE 4 CHARACTERS').isLength({min: 4}),
    body('description', 'DESCRIPTION SHOULD BE AT LEAST 20 CHARACTERS').isLength({min: 20}),
    body('imageUrl').custom(httpsStart)

]


function httpsStart(imageUrl, {req}) {

    if(!imageUrl.startsWith('https')) {

        throw new Error ('imageURL SHOULD START WITH HTTPS')
    }

    return true;
}