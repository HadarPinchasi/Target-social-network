// JavaScript source code
const Article = require('../models/users');
const createUser = async (userName, password, firstName, lastName, profilePicture) => {
    const user = new User({ userName: userName, password: password, firstName: firstName, lastName: lastName, profilePicture: profilePicture });
    return await user.save();
};
const getUserById = async (id) => { return await User.findById(id); };
/*const getArticles = async () => { return await Article.find({}); };

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
};*/
module.exports = { createUser, getUserById/*, getArticles, updateArticle, deleteArticle */ }
