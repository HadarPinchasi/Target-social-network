// JavaScript source code
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
function Article() {
    const { id } = useParams();
    const [article, setArticle] = useState({ title: '', published: '', author: '', content: '' })
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`http://localhost:12345/api/articles/65dde807fdbccd702d160086`)
                const article = await response.json()
                setArticle(article)
            } catch (error) {
                // handle error
            }
        };
        fetchArticles();
    }, [id]);
    return (
        <article>
            <h1>{article.title}</h1>
            <p>Published on: {article.published}</p>
            <p>Author: {article.author}</p>
            <p>{article.content}</p>
        </article>
    );
}
export default Article;