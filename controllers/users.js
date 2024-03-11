// JavaScript source code
const userService = require('../services/users');
const createUser = async (req, res) => {
    const { userName, password, firstName, lastName, profilePic } = req.body;
    const userExist = await userService.getUserByUserName(req.body.userName);
    if (userExist) {
        return res.status(409).json({ errors: ['User is already exist'] });
    }
    else {
        const newUser = await userService.createUser(userName, password, firstName, lastName, profilePic);

/*        res.json(await userService.createUser(userName, password, firstName, lastName, profilePic));
*/        return res.status(200).json(newUser);
    }
};
const requestFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await userService.addFriendRequest(userId, friendId);

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getUser = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};

const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body.firstName, req.body.lastName, req.body.profilePic);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};
const deleteUser = async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['Article not found'] });
    }
    res.json(user);
};
const deleteFriend = async (req, res) => {
    const friend = await userService.deleteFriend(req.params.id);
    if (!friend) {
        return res.status(404).json({ errors: ['Friend not found'] });
    }
    res.json(user);
};
const getFriends = async (req, res) => {
    res.json(await userService.getFriends());
};
module.exports = { createUser, getUser, updateUser, deleteUser, getFriends, requestFriend, deleteFriend }

