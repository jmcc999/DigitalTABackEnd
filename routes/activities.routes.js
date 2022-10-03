const express = require('express')
const router = express.Router()

const ctrls = require('../controllers')


router.get('/', ctrls.activities.index)
router.post('/', ctrls.activities.create)
router.delete('/:id', ctrls.activities.destroy)
router.put('/:id', ctrls.activities.update)

module.exports = router