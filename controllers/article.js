// JavaScript source code
const articleService = require('../services/article');
const userService = require('../services/users');

const createArticle = async (req, res) => {
    const { firstName, lastName, content, userId } = req.body;
    try {
        const newArticle = await articleService.createArticle(firstName, lastName, content, userId);
        console.log('hhhhhh')
        const user = await userService.getUserById(req.body.userId);
        if (!user) {
            return res.status(404).json({ errors: ['User not found'] });
        }
        user.posts.push(newArticle._id);
        await user.save();
        res.status(201).json({ article: newArticle, user: user });
    } catch (error) {
        res.status(500).json({ errors: ['Internal server error'] });
    }

/*    res.json(await articleService.createArticle(firstName, lastName, content));
*/};
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
    const article = await articleService.updateArticle(req.params.pid, req.body.content);
    if (!article) {
        return res.status(404).json({ errors: ['Article not found'] });
    }
    res.json(article);
};
const deleteArticle = async (req, res) => {
    const article = await articleService.deleteArticle(req.params.pid);
    if (!article) {
        return res.status(404).json({ errors: ['Article not found'] });
    }
    res.json(article);
};
module.exports = { createArticle, getArticles, getArticle, updateArticle, deleteArticle };

