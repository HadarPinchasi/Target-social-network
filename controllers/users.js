// JavaScript source code
const userService = require('../services/users');

//being used -id=username
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

//being used id=username
const getUser = async (req, res) => {
    const user = await userService.getUserByUserName(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};
//being used 
const getPostsOf = async (req, res) => {
    const articles = await userService.getPostsOf(req.params.id);
    if (!articles) {
        return res.status(404).json({ errors: ['User not found1'] });
    }

    res.status(200).json(articles);
};
//being used -id=username 
const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body.firstName, req.body.lastName, req.body.profilePic);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
/*    posts = userService.getPostsOf(req.params.id);
*/    res.status(200).json(user);/*, posts */
};
const deleteUser = async (req, res) => {//being used -id=username
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['User not found2'] });
    }
    res.json(user);
};

const getRequests = async (req, res) => {
    user = await userService.getRequests(req.params.id)
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};
const getFriends = async (req, res) => { 
    user = await userService.getFriends(req.params.id)
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};
const newFriendRequest = async (req, res) => {
    user = await userService.addFriendRequest(req.params.id, req.body.userName)
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    if (user ==='exist') {
        return res.status(403).json({ errors: ['already exist'] });
    }
    
    res.json(user);

};
const approveRequest = async (req, res) => {
    user = await userService.approveRequest(req.params.id, req.params.fid)
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};
const deleteFriend = async (req, res) => {
    const user = await userService.deleteFriend(req.params.id, req.params.fid);
    if (!user) {
        return res.status(404).json({ errors: ['Friend not found'] });
    }
    res.json(user);
};
module.exports = {
    createUser, getUser, updateUser, deleteUser, getPostsOf, getFriends,
    newFriendRequest, approveRequest, deleteFriend, getRequests
}

