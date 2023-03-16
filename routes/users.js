var express = require('express');
var router = express.Router();

const moment = require('moment')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const model = require("../models/index");
const dotenv = require('dotenv').config()

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

router.post("/regsiterUser", async (req, res) => {
    try {
        const name = req.body.name.trim();
        var dob = req.body.dob;
        const email = req.body.email.trim();
        const mobile = req.body.country_code + req.body.mobile.trim();
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        let errors = [];
        console.log(req.body)

        // Check Server side validation
        if (!password.localeCompare(confirmPassword)) {
            errors.push({ confirm_password: "Password mismatch" })
        }

        if (password.length < 6) {
            errors.push({ password: "Too weak password. Minimum Password length should be 6 Character long." })
        }

        if (mobile == "" || !/^\d+$/.test(mobile)) {
            errors.push({ mobile: "Invalid Mobile Number" })
        }

        if (email == "" || !EMAIL_REGEX.test(email)) {
            errors.push({ email: "Invalid Email Address" })
        }

        if (name == "") {
            errors.push({ name: "Name Cannot be empty." })
        }

        if (!moment(dob).isValid()) {
            errors.push({ dob: "Invalid DOB" })
        }

        var user = await model.User.findOne({ where: { email } });

        if (user) {
            errors.push({ email: "User with this email id already exists" })
        }

        if (errors.length > 0) {
            throw errors
        }

        var hashedPassword = await bcryptjs.hash(password, 6);
        // Add values into Database
        await model.User.create({
            name,
            email,
            mobile,
            dob,
            password: hashedPassword
        })

        res.redirect("/login");
    } catch (e) {
        return res.status(500).send(e)
    }
})

router.post("/loginUser", async (req, res) => {
    console.log(req.header)
    try {
        const email = req.body.email.trim();
        const password = req.body.password;

        // Check if user exist
        var user = await model.User.findOne({ where: { email } });

        if (!user) {
            throw { msg: "User not found", type: "USER_NOT_FOUND", statusCode: 404 }
        }

        const correctPassword = await bcryptjs.compare(password, user.password);

        if (!correctPassword) {
            throw { msg: "Incorrect Password", type: "USER_AUTHENTICATION_ERROR", statusCode: 500 }
        }

        const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

        return res.send({ token, user });
    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
})

module.exports = router;