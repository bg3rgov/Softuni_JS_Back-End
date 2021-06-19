const {User, Course} = require('../models');

module.exports = {

    getAllCourses: async () => {

        return await Course.find().lean();
    },

    getCourse: async (req, res) => {

        return await Course.findOne({_id: req.params.id}).lean();
    },

    sortByDate: async (req, res) => {

        const courses = await Course.find().lean();
        
        const sorted = courses.sort((a, b) =>  a.createdAt - b.createdAt );
        return sorted;
        
    },

    sortByEnroll: async() => {

        const courses = await Course.find().lean();
        const sorted = courses.sort((a, b) => b.usersEnrolled.length - a.usersEnrolled.length);
        const result = sorted.splice(0,3);

        return result;


    },

    search: async (req, res) => {

        const search = req.query;
        console.log(search);
    }
}