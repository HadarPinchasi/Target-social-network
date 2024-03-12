const loginService = require('../services/login');
const jwt = require('jsonwebtoken');
const key = 'your_secret_key';

const processLogin = async (req, res) => {
    const { userName, password } = req.body;
    const userExist = await loginService.getUserLog(req.body.userName, req.body.password);
    if (userExist) {
        const data = { username: req.body.userName}
        const token = jwt.sign(data, key)
        res.status(200).json({ token });
    }
    else {
        res.status(404).send('Invalid username and/or password')
    }
}
// Ensure that the user sent a valid token
const isLoggedIn = (req, res, next) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
            // Verify the token is valid
            const data = jwt.verify(token, key);
            // Token validation was successful. Continue to the actual function (index)
            return next()
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    }
    else
        return res.status(403).send('Token required');
}
module.exports = { processLogin, isLoggedIn };
