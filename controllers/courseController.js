const {Course, User} = require('../models');
const {getCourse} = require('../utils/utils');
const {formValidator} = require('../utils');

module.exports = {

    get: {

        create: (req, res) => {

            res.render('./course pages/create-course')
        },

        details: async (req, res) => {

            let isEnrolled = false;
            const course = await getCourse(req, res);

            const user = await(await User.findOne({_id: req.user._id})).populate('enrolledCourses');
            console.log(user.enrolledCourses);

            if(user.enrolledCourses.includes(req.params.id)){

                isEnrolled = true;
            }

            console.log(isEnrolled);


            const isCreator = req.user._id.toString() === course.creator.toString();
            res.render('./course pages/course-details', {isEnrolled, isCreator, ...course});
        },

        delete: (req, res) => {

            Course.deleteOne({_id: req.params.id}).then(d => console.log('DELETED')).catch( e => console.log(e));
            res.redirect('/');
        },

        edit: async (req, res) => {

            const course = await getCourse(req, res);
            res.render('./course pages/edit-course', course)
        },

        enroll: (req, res) => {

            User.updateOne({_id: req.user._id}, {$addToSet: {enrolledCourses: [req.params.id]}}).then(u => {
            
                console.log('COURSE ENROLLED BY USER');

                Course.updateOne({_id: req.params.id}, {$addToSet: {usersEnrolled: [req.user._id]}}).then(e => {
                    console.log('USER ENROLLED TO COURSE');
                    res.redirect(`/details/${req.params.id}`)
                }).catch( e => console.log(e));
            }).catch( e => console.log(e));
            
        }
    },

    post: {

        create: (req, res) => {

            const formValidations = formValidator(req);
            console.log(formValidations)
            if(!formValidations.isOk) {

                res.render('./course pages/create-course', formValidations.contextOptions);
                return;
            }

            const newDate = new Date();
            const date = ('0' + newDate.getDate()).slice(-2);
            const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
            const year = newDate.getFullYear();
            const createdAt = `${date}/${month}/${year}`
            const {title, description, imageUrl, duration} = req.body;

            Course.create({title, description, imageUrl, duration, creator: req.user._id, createdAt}).then(c => {

                console.log('COURSE ADDED');
                res.redirect('/');
            })
            .catch( e => {

                const error = true;
                const message = 'TITLE, DESCRIPTION, imageUrl and DURATION ARE REQUIRED FIELDS';
                const oldInput = {...req.body}
                res.render('./course pages/create-course', {error, message, oldInput});
            });

        },

        edit: (req, res) => {

            let {title, description, imageUrl, duration} = req.body;

            Course.updateOne({_id: req.params.id}, {title, description, imageUrl, duration})
            .then(u => {res.redirect(`/details/${req.params.id}`); console.log('UPDATED')}).catch( e => console.log(e))
        }
    }
}