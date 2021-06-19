const {validationResult} = require('express-validator');

module.exports = (req) => {

    
    const errors = validationResult(req)
    
    if(!errors.isEmpty()) {
        
        return {
            contextOptions: {

                oldInput: {
                    ...req.body
                },
                message: `${errors.array()[0].msg}`,
                error: true,
            },
            isOk: false
        }        
    }

    return {error: false, isOk: true}

}