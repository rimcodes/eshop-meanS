const {Message} = require('../models/message');
const express = require('express');
const router = express.Router();

// Get all the resources
router.get('/', async (req, res) => {
    const messages = await Message.find();

    if(!messages) {
        res.status(500).json({ success: false });
    }

    res.status(200).send(messages);
})

// Get resource by id
router.get('/:id', async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (!message) {
        res.status(500).json({ message: 'This messgae can not be found.'});
    }

    res.status(200).send(message);
});

// creating a reource
router.post('/', async (req, res) => {
    let message = new Message({
        username: req.body.username,
        email: req.body.email,
        topic: req.body.topic,
        message: req.body.message
    });
    message = await message.save();

    if (!message) {
        return res.status(404).send('The message could not be created.')
    }

    res.send(message);
});

// deleting a specific resource
router.delete('/:id', (req, res) => {
    Message.findByIdAndRemove(req.params.id).then(message => {
        if(message) {
            return res.status(200).json({ success: true, message: 'the message was deleted.'})
        } else {
            return res.status(404).json.apply({success: false, message: "message not found"})
        }
    }).catch( err => {
        return res.status(400).json({success: false, error: err });
    });

});

module.exports = router;
