const db = require('../models')

// get activities
const index = (req, res) => {
    db.Activity.find({}, (err, activities) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json({
            activities,
            requestedAt: new Date().toLocaleDateString()
        })
    })
}
// create a Activity with req.body
const create = (req, res) => {
    db.Activity.create(req.body, (err, createdActivity) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json(createdActivity)  //  .json() will send proper headers in response so client knows it's json coming back
    })
}

//destroy a single Activity by its ID
const destroy = (req, res) => {
    db.Activity.findByIdAndDelete(req.params.id, (error, deletedActivity) => {
        //if no Activity is found, let the frontend know with the json error message
        if(!deletedActivity) return res.status(400).json({error: "Activity not found"})
        //if an error is produced, display it
        if(error) return res.status(400).json({error: error.message})
        return res.status(200).json({
            message: `Activity ${deletedActivity.name} deleted successfully! `
        })
    })
}

//updating a single Activity
const update = (req, res) => {
    db.Activity.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body
        }, 
        {new: true}, 
        (err, updatedActivity) => {
            if(err) return res.status(400).json({error: err.message})
            return res.status(200).json(updatedActivity)
        }
    )
}

module.exports = {
    index,
    create,
    destroy,
    update
}
