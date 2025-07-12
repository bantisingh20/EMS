import React, { Children, createContext, useContext, useEffect, useState } from 'react';

//Create the context
export const ThemeContext = createContext();


//Create a context provider
export const ThemeProvider = ({ Children }) => {
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
    return (
        <ThemeContext.Provider value={theme}>
            {Children}
        </ThemeContext.Provider>
    )
}