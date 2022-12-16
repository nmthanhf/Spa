const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({

}, {
    timestamps: true
})
module.exports = mongoose.model('Report', ReportSchema);