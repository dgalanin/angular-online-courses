const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASS}@cluster0.9nfxk.mongodb.net/OnlineCourses?retryWrites=true&w=majority`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
    console.log('We are connected!');
});

module.exports = db;
