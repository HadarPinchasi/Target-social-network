// JavaScript source code
const articleService = require('../services/article');
const createArticle = async (req, res) => {
    const { firstName, lastName, content } = req.body;
    res.json(await articleService.createArticle(firstName, lastName, content));
};
const getArticles = async (req, res) => {
    res.json(await articleService.getArticles());
};
const getArticle = async (req, res) => {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) {
        return res.status(404).json({ errors: ['Article not found'] });
    }
    res.json(article);
};
const updateArticle = async (req, res) => {
    const article = await articleService.updateArticle(req.params.id, req.body.content);
    if (!article) {
        return res.status(404).json({ errors: ['Article not found'] });
    }
    res.json(article);
};
const deleteArticle = async (req, res) => {
    const article = await articleService.deleteArticle(req.params.id);
    if (!article) {
        return res.status(404).json({ errors: ['Article not found'] });
    }
    res.json(article);
};
module.exports = { createArticle, getArticles, getArticle, updateArticle, deleteArticle };

