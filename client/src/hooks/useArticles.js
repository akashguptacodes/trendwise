// src/hooks/useArticles.js
import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';
import { mockArticles } from '../data/mockData';

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // In development, use mock data
      // In production, replace with actual API call
      const data = await articleService.getAllArticles() || mockArticles;
      setArticles(data);
    } catch (err) {
      setError(err.message);
      // Fallback to mock data
      setArticles(mockArticles);
    } finally {
      setLoading(false);
    }
  };

  const getArticleBySlug = (slug) => {
    return articles.find(article => article.slug === slug);
  };

  const addComment = async (articleId, comment) => {
    try {
      const updatedArticle = await articleService.addComment(articleId, comment);
      setArticles(prev => 
        prev.map(article => 
          article.id === articleId ? updatedArticle : article
        )
      );
      return updatedArticle;
    } catch (err) {
      // Fallback for mock data
      const newComment = {
        id: Date.now(),
        author: comment.author,
        content: comment.content,
        createdAt: new Date().toISOString()
      };

      setArticles(prev => 
        prev.map(article => 
          article.id === articleId 
            ? { ...article, comments: [...article.comments, newComment] }
            : article
        )
      );
    }
  };

  const incrementViews = (articleId) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === articleId 
          ? { ...article, views: article.views + 1 }
          : article
      )
    );
  };

  return {
    articles,
    loading,
    error,
    getArticleBySlug,
    addComment,
    incrementViews,
    refetch: fetchArticles
  };
};