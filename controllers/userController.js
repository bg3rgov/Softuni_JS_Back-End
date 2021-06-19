const {User} = require('../models');
const {jwt, formValidator} = require('../utils');
const {cookie} = require('../config/config');

module.exports = {

    get: {

        login(req, res) {

            res.render('login');
        },

        register(req, res) {

            res.render('register')
        }, 

        logout(req, res) {

            res.clearCookie(cookie).redirect('/')
        }
    },

    post: {

        register(req, res) {
			
            const formValidations = formValidator(req);
            console.log(formValidations)
            if(!formValidations.isOk) {

                res.render('register', formValidations.contextOptions);
                return;
            }

		
            const { username, password } = { ...req.body };

            User
                .findOne({ username })
                .then((user) => {
                    if (user) {
                        const error = true;
                        const message = 'USERNAME IS ALREADY TAKEN';
                        res.render('register', {error, message})
                        throw new Error('The given username is already in use...');
                    }
                    return User.create({ username, password })
                })
                .then((createdUser) => {
                    res.redirect('/login');
                })
                .catch((e) => {
                    console.log(e);
                    //res.redirect('/register');
                });
        },

        login(req, res) {
            
			const formValidations = formValidator(req);
            if(!formValidations.isOk) {

                res.render('login', formValidations.contextOptions);
                return;
            }

            const { username, password } = req.body;

            User
                .findOne({ username })
                .then((user) => {
                    return Promise.all([
                        user.comparePasswords(password),
                        user,
                    ])
                })
                .then(([isPasswordsMatched, user]) => {
                    if (!isPasswordsMatched) {
                        throw new Error('The provided password does not matched.');
                    }

                    const token = jwt.createToken(user._id);

                    res
                        .status(200)
                        .cookie(cookie, token, { maxAge: 3600000 })
                        .redirect('/');

                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
}