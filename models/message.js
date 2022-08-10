const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    topic: {
        type: String,
    },
    message: {
        type: String,
        required: true
    }
});

messageSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

messageSchema.set('toJSON', {
    virtuals: true
});

exports.Message = mongoose.model('Message', messageSchema);
exports.messageSchema = messageSchema;