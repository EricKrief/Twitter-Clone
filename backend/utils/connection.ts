const mongoose = require('mongoose');


module.exports = function connectDb() {
    mongoose.connect('mongodb://localhost/twitter-clone', { useNewUrlParser: true });
    mongoose.connection.once('open', () => {
        console.log("Connected to DB");
    }).on('error', (error) => {
        console.log("Error: " + error);
    })
}
