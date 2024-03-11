// JavaScript source code
const Article = require('../models/article');
const userServices = require('../services/users');


const createArticle = async (firstName, lastName, content, userId, time) => {
    const article = new Article({ firstName: firstName, lastName: lastName, content: content, userId: userId, time: time });
    if (time) article.time = time;
    return await article.save();
};
const getArticleById = async (id) => { return await Article.findById(id); };
const getArticles = async () => { return await Article.find({}); };

const updateArticle = async (id, content) => {
    const article = await getArticleById(id);
    if (!article) return null;
    if (content) article.content = content;
/*    article.content = content;
*/    await article.save();////photo!!
    return article;
};
const deleteArticle = async (id) => {
    const article = await getArticleById(id);
    if (!article) return null;
    const user = await userServices.deletePostInUser(article.userId,id);
    await article.deleteOne();
    return article;
};
module.exports = { createArticle, getArticleById, getArticles, updateArticle, deleteArticle }