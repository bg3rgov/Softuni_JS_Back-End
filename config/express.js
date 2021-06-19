const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const {auth} = require('../utils');

module.exports = (app) => {

    app.use('/static', express.static('static'));
	app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
	
	app.use(auth);
    
    app.engine('.hbs', handlebars({extname: '.hbs'}));
    app.set('view engine', '.hbs');

} 