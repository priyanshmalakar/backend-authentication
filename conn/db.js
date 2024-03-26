const mongoose = require("mongoose");
const userSchema = require("./userSchema"); 


mongoose.connect('mongodb+srv://admin:root@notepad.snq6iax.mongodb.net/userlogin?retryWrites=true&w=majority&appName=notepad').then(()=>{
    console.log("database connectd");
});
const User = mongoose.model('User' , userSchema);

module.exports = User;
