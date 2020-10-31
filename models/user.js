const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        lastName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['student', 'teacher'],
            required: true
        },
        exams: {
            type: Array,
            // required: function () {
            //     return this.role === 'student';
            // },
            default: function () {
                return ((this.role === 'student')? [] : undefined);
            }
        }
    }
);

module.exports = mongoose.model('User', userSchema);