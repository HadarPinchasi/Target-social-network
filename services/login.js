const User = require('../models/users');

const getUserLog = async (userName, password) => {
    return await User.findOne({ userName, password });
};

module.exports = { getUserLog }
