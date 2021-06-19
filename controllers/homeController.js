const {getAllCourses, sortByDate, sortByEnroll, search} = require('../utils/utils');

module.exports = {

    get: {

        home: async (req, res) => {

            
            
            const courses = res.locals.isLoggedIn ? await sortByDate(req, res) : await sortByEnroll();
            
            if(res.locals.isLoggedIn){
                
                return res.render('home', {courses})
            }
            
            res.render('home', {courses})
            
        },
    },

    post: {

        search: async(req, res) => {

            await search(req,res);
        }
    }
}