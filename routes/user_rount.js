const express = require('express');
const router = express.Router();

const exportModel = require('../model/model')

// create one quiz question

router.post('/questions/Add', (req, res) => {
    let isAddquestion = exportModel.QuestionModel.create(req.body)
    if (isAddquestion) {
        res.status(201).send({
            "message": 'Question added successfully'
        })
    } else {
        res.status(500).send({
            "message": 'All field required'
        })
    }
})
module.exports = router
