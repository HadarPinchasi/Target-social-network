// JavaScript source code
const Article = require('../models/article');
const userServices = require('../services/users');

//being used
const createArticle = async (firstName, lastName, content, userId,userName, time) => {
    const article = new Article({ firstName: firstName, lastName: lastName, content: content, userId: userId, userName: userName, time: time });
    if (time) article.time = time;
    return await article.save();
};
//being used -id=username
const getArticleById = async (id) => { return await Article.findById(id); };
const getArticles = async () => { return await Article.find({}); };
//being used -id=username
const updateArticle = async (id, content) => {
    const article = await getArticleById(id);
    if (!article) return null;
    if (content) article.content = content;
    await article.save();////photo!!
    return article;
};
//being used -id=username
const deleteArticle = async (id) => {
    const article = await getArticleById(id);
    if (!article) return null;
    const user = await userServices.deletePostInUser(article.userId,id);
    await article.deleteOne();
    return article;
};
module.exports = { createArticle, getArticleById, getArticles, updateArticle, deleteArticle }