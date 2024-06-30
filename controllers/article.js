// JavaScript source code
const articleService = require('../services/article');
const userService = require('../services/users');
//being used -id=username
const createArticle = async (req, res) => {
    const { content, photo } = req.body;
   // const user = await userService.getUserById(req.body.userId);
    const user= req.user;
    const newArticle = await articleService.createArticle(user.firstName,user.lastName, content, user._id, user.userName, photo, user.profilePic);
        if (!user) {
            return res.status(404).json({ errors: ['User not found'] });
        }
        user.posts.push(newArticle._id);
        await user.save();
        res.status(201).json({ article: newArticle});
    } 

const getArticles = async (req, res) => {
    const user = req.user; 
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const friends = user.friends; 
    const limit = 20; 
    try {
        const friendsPosts = await articleService.getFriendsPosts(user._id, friends, limit);
        const nonFriendsPosts = await articleService.getNonFriendsPosts(user._id, friends, 5);
        const feedPosts = friendsPosts.concat(nonFriendsPosts); 
        res.status(200).json(feedPosts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve feed posts' });
    }
};


const getArticle = async (req, res) => {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) {
        return res.status(404).json({ errors: ['Article not found'] });
    }
    res.json(article);
};
//being used V
const updateArticle = async (req, res) => {
    const article = await articleService.updateArticle(req.params.pid, req.body.content, req.body.photo);
    if (!article) {
        return res.status(404).json({ errors: ['Article not found'] });
    }
    res.json(article);
};
//being used -id=usernameV
const deleteArticle = async (req, res) => {
    const article = await articleService.deleteArticle(req.params.pid);
    if (!article) {
        return res.status(404).json({ errors: ['Article not found'] });
    }
    res.json(article);
};
module.exports = { createArticle, getArticles, getArticle, updateArticle, deleteArticle };

