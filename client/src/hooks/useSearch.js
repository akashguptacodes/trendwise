// src/hooks/useSearch.js
import { useState } from "react";

function useSearch(initialArticles) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(initialArticles);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    const results = initialArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery)
    );
    setFilteredArticles(results);
  };

  return { searchQuery, handleSearch, filteredArticles, setSearchQuery };
}

export default useSearch;