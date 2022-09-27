// Schema rough draft
// activity {
//     type: string (lesson,lab or assessment)
//     complete: boolean
//     subject: string
//     structure: string
//     objective: string
//     procedure: array
//     materials: array
//     notes: string
//     }

const mongoose = require('mongoose')

// Schema

const activitySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    subject: {
        type: String,
        required: true
    },
    structure: {
        type: String,
        required: false
    },
    objective: {
        type: String,
        required: true
    },
    procedure: [{type: String}],
    materials: [{type: String}],
    notes: {
        type: String,
        required: false
    }
})

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity