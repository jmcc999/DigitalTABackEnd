const db = require('../models')

// get activities
const index = (req, res) => {
    db.Activity.find({}, (err, activites) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json({
            activities,
            requestedAt: new Date().toLocaleDateString()
        })
    })
}

module.exports = {index}