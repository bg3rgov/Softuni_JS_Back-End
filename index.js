const config = require('./config/config');
const express = require('express')
const app = express();
const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');


require('./config/express')(app);
app.use('/', homeRouter);
app.use('/', userRouter);
app.use('/', courseRouter);



const dbConnectionPromise = require('./config/database')((config.databaseUrl));
dbConnectionPromise.then(() => {

    app.listen(config.port, console.log(`SERVER IS RUNNING ON PORT ${config.port}...`))
})