const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Submit feedback
router.post('/addFeedback', async (req, res) => {
    const { userName, userEmail, feedback } = req.body;

    try {
        const newFeedback = new Feedback({
            userName,
            userEmail,
            feedback
        });

        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit feedback', error });
    }
});

// Get all feedbacks (optional, if you want to display all feedbacks)
router.get('/feedbacks', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch feedbacks', error });
    }
});

module.exports = router;