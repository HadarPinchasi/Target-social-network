// JavaScript source code
const userService = require('../services/users');
const createUser = async (req, res) => {
    const { userName, password, firstName, lastName, profilePic } = req.body;
    const userExist = await userService.getUserById(req.params.id);
    if (userExist) {
        return res.status(409).json({ errors: ['User is already exist'] });
    }
    else {
        res.json(await userService.createUser(userName, password, firstName, lastName, profilePic));
        return res.status(200).json(req.body);
    }
};
/*const getArticles = async (req, res) => { 
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
};*/
/*module.exports = { createArticle, getArticles, getArticle, updateArticle, deleteArticle };*/
module.exports = { createUser }

