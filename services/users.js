// JavaScript source code
const User = require('../models/users');
const createUser = async (userName, password, firstName, lastName,profilePic) => {
    const user = new User({ userName: userName, password: password, firstName: firstName, lastName: lastName, profilePic: profilePic  });
    return await user.save();
};
const getUserById = async (id) => { return await User.findById(id); };
const getUserByUserName = async (userName) => {
    return await User.findOne({ userName });
};

const updateUser = async (id, firstName, lastName, profilePic) => {
    const user = await getUserById(id);
    if (!user) return null;
/*    user.firstName = firstName;
    user.lastName = lastName;
    user.profilePic = profilePic;
*/    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (profilePic) user.profilePic = profilePic;

    await user.save();
    return user;
};
/*
const getArticles = async () => { return await Article.find({}); };
*/
const deleteUser = async (id) => {
    const user = await getUserById(id);
    if (!user) return null;
    await user.deleteOne(); 
    return user;
};

module.exports = { createUser, getUserByUserName, getUserById, updateUser, deleteUser }
