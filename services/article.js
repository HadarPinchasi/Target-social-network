// JavaScript source code
const Article = require('../models/article');
const createArticle = async (firstName, lastName, content, time) => {
    const article = new Article({ firstName: firstName, lastName: lastName, content: content, time: time });
    if (time) article.time = time;
    return await article.save();
};
const getArticleById = async (id) => { return await Article.findById(id); };
const getArticles = async () => { return await Article.find({}); };

const updateArticle = async (id, content) => {
    const article = await getArticleById(id);
    if (!article) return null;
    article.content = content;
    await article.save();
    return article;
};
const deleteArticle = async (id) => {
    const article = await getArticleById(id);
    if (!article) return null;
    await article.deleteOne();
    return article;
};
module.exports = { createArticle, getArticleById, getArticles, updateArticle, deleteArticle }