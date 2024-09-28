const express = require("express");
const {contact} = require("../controller/contactController");

const routers = express.Router()

routers.post("/contect", contact)

module.exports = routers