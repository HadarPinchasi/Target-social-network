// / JavaScript source code
const User = require('../models/users');
const Article = require('../models/article');
//being used -id=username 
const createUser = async (userName, password, firstName, lastName, profilePic) => {
    const user = new User({
        userName: userName, password: password, firstName: firstName,
        lastName: lastName, profilePic: profilePic
    });
    return await user.save();
};
//being used -id=username
const getUserById = async (id) => { return await User.findById(id); };
//being used id=username
const getUserByUserName = async (userName) => {
    return await User.findOne({ userName }).select('-password');
};
const deletePostInUser = async (id, pid) => {
    const user = await getUserById(id);
    if (!user) return null;
    user.posts.pull(pid);
    await user.save();
    return user;
}
//being usedid=username
const getPostsOf = async (id) => {
    const articles = await Article.find({ userName: id }).sort({ time: -1 });;
    if (!articles) return null;
    return articles;
};



const getRequests = async (userName) => {
    const user = await getUserByUserName(userName);
    if (!user) return null;
    const friends = await User.find(
        { userName: { $in: user.requestsFriends } }, 
    { password: 0, posts: 0, friends: 0, requestsFriends: 0 }
    );
    return friends;
};


const getFriends = async (userName) => {
    const user = await getUserByUserName(userName);
    if (!user) return null;
    const friends = await User.find({ _id: { $in: user.friends } }, { password: 0 });
    return friends;
};
const addFriendRequest = async (userName,userNameFriend) => {
    const user = await getUserByUserName(userName);
    if (!user) return null;
    const friend = await getUserByUserName(userNameFriend);
    if (!friend) return null;
    if (user.friends.includes(userNameFriend) || user.requestsFriends.includes(userNameFriend)) {
        return 'exist';
        }
    user.requestsFriends.push(userNameFriend)
    await user.save();
    return user;
     
};

const approveRequest = async (userName, userNameFriend) => {
    const user = await getUserByUserName(userName);
    if (!user) return null;

    const friend = await User.findOne({ userName: userNameFriend }); // Find the friend user document
    if (!friend) return null;

    if (!user.friends.includes(friend._id)) { // Check if the friend is not already in the friends array
        user.friends.push(friend._id); // Push the friend's ObjectId into the friends array
        friend.friends.push(user._id);
        user.requestsFriends.pull(userNameFriend); // Remove the friend's username from the requestsFriends array
        await user.save();
        await friend.save();
    }

    return user;
};
//userID- userName userfrienid- username 
const deleteFriend = async (userName,userFriendName) => {
    const user = await getUserByUserName(userName);
    if (!user) return null;
    const friend = await User.findOne({ userName: userFriendName });
    if (!friend) return null;
    if (user.friends.includes(friend._id)) {
        user.friends.pull(friend._id);
        friend.friends.pull(user._id);
    }
    if (user.requestsFriends.includes(userFriendName)) {
        user.requestsFriends.pull(userFriendName);
    }
    await user.save();
    await friend.save();
    return user;
};


module.exports = {
    createUser, getUserByUserName, getUserById,
     deletePostInUser, getPostsOf, getFriends, addFriendRequest, approveRequest, deleteFriend, getRequests
}

