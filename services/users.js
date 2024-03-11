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

const getFriends = async () => {
    return await User.find({});
}
const addFriendRequest = async (userId, friendId) => {
    try {
        const user = await getUserById(userId);
        if (user.friends.includes(friendId) || user.friendRequests.includes(friendId)) {
            throw new Error('Friend request already sent or user is already a friend.');
        }
        user.friendRequests.push(friendId)
        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Error adding friend request: ${error.message}`);
    }
};
const updateUser = async (id, firstName, lastName, profilePic) => {
    const user = await getUserById(id);
    if (!user) return null;
  if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (profilePic) user.profilePic = profilePic;

    await user.save();
    return user;
};
/*
const getArticles = async () => { return await Article.find({}); };
*/
const deletePostInUser = async (id, pid)=>{
    const user = await getUserById(id);
    if (!user) return null;
    user.posts.pull(pid);
    await user.save();
    return user;
}
const deleteUser = async (id) => {
    const user = await getUserById(id);
    if (!user) return null;
    await user.deleteOne(); 
    return user;
};
const getFriendById = async (id) => { return await User.friends.findOne(id) };
const deleteFriend = async (id) => {
    const friend = await getFriendById(id);
    if (!friend) return null;
    await User.friends.deleteOne(id);
    return user;
};

module.exports = { createUser, getUserByUserName, getUserById, updateUser, deleteUser, deletePostInUser, getFriends, addFriendRequest, deleteFriend }
