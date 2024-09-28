const mongoose = require("mongoose")

const contactShcema = new mongoose.Schema({
    name: {
        type: String,
        required :[true, "Name is required"],
    },
    email: {
        type: String,
        required : [true, "E-Mail is required"],
    },
    phoneNo: {
        type: String,
        required : [true, "Phone number is required"],
        minlength: [10, 'Username must be at least 3 characters long'], // Minimum length of 3 characters
        maxlength: [12, 'Username cannot be more than 20 characters long'] // Maximum length of 20 characters
    },
    companyName: {
        type: String,
        default: "self"
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    },
    date: {
        type: String,
        default: function(){
            const date =  new Date()
            return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
    }
}, {timestamps:true})

const contactModule = mongoose.model("contect", contactShcema)

module.exports = contactModule