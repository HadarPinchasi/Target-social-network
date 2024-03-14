// JavaScript source code
const Article = require('../models/article');
const userServices = require('../services/users');
const User = require('../models/users');

//being used
const createArticle = async (firstName, lastName, content, userId, userName, photo,profilePic, time) => {
    const article = new Article({ firstName: firstName, lastName: lastName, content: content, userId: userId, userName: userName, photo: photo, profilePic: profilePic, time: time });
    if (content) article.content = content;
    if (photo) article.photo = photo;
    if (time) article.time = time;
    return await article.save();
};
//being used -id=username
const getArticleById = async (id) => { return await Article.findById(id); };
const getArticles = async () => { return await Article.find({}); };
//being used -id=username
const updateArticle = async (id, content,photo) => {
    const article = await getArticleById(id);
    if (!article) return null;
    if (content) article.content = content;
    if (photo) article.photo = photo;
    await article.save();
    return article;
};
const getFriendsPosts = async (userId, friends, limit) => {
    return await Article.find({ userId: { $in: friends } }).sort({ time: -1 }).limit(limit);
};

const getNonFriendsPosts = async (userId, friends, limit) => {
    return await Article.find({ userId: { $nin: friends } }).sort({ time: -1 }).limit(limit);
};


//being used -id=username
const deleteArticle = async (id) => {
    const article = await getArticleById(id);
    if (!article) return null;
    const user = await userServices.deletePostInUser(article.userId,id);
    await article.deleteOne();
    return article;
};
module.exports = { createArticle, getArticleById, getArticles, updateArticle, deleteArticle, getFriendsPosts, getNonFriendsPosts }