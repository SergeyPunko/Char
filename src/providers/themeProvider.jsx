import { useEffect, createContext, useState } from 'react';
import { THEME, THEME_KEY } from '../utils/constants';

const ThemeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem(THEME_KEY);
  if (!theme) {
    localStorage.setItem(THEME_KEY, THEME.dark);
    return THEME.dark;
  } else {
    return theme;
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  const toggleTheme = () => {
    if (theme === THEME.dark) {
      setTheme(THEME.light);
    } else {
      setTheme(THEME.dark);
    }
  };

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem(THEME_KEY, theme);
      document.body.classList.remove(THEME.light);
      document.body.classList.remove(THEME.dark);

      document.body.classList.add(theme);
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
