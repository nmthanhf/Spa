const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/project')
        console.log('OK     ')
    } catch (error) {
        console.log('db cn failure')
    }
}
 
module.exports = { connect }