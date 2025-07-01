import { useState, useEffect } from 'react';

function useAuth() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("trendwise-user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("trendwise-user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("trendwise-user");
  };

  return { user, login, logout };
}

export default useAuth;
