import { useEffect, createContext, useState } from 'react';

const ThemeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  if (!theme) {
    // Default theme is taken as dark-theme
    localStorage.setItem('theme', 'dark');
    return 'dark';
  } else {
    return theme;
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem('theme', theme);
      document.body.classList.add(theme === 'dark' ? 'light' : 'dark');
      document.body.classList.remove(theme);
    };

    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
