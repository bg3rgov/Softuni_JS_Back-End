
module.exports = (mongoose) => {

    const { Schema, model: Model } = mongoose;
    const { String, ObjectId } = Schema.Types;

    const courseSchema = new Schema({
       
	   title: {

        type: String,
        required: true,
        unique: true
       },

       description: {

        type: String,
        required: true,
        maxlength: 50
       },

       imageUrl: {

        type: String,
        required: true
       },

       duration: {

        type: String,
        required: true,
       },

       createdAt: {

        type: String,
        required: true
       },

       creator: {

        type: String
       },

       usersEnrolled: [{type: ObjectId, ref: 'Users'}]
    });

    return Model('Course', courseSchema);
};