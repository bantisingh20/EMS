# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


//Folder structure 

/public : contain static assests and html file that serves the entry point of app
eg:- .html 

/src : contain main source code of app
    index.js : entry point to render app
    app.js : root of all component
    components / : folder for reuseable component
    pages / : foldere for components representting diffrent page or view
    service or api /: folder for code related to data fetching or api calls
    style or css / : css files
    hooks / : custom hooks for reusing logic
    utils or helpers : helping modules
    context : for context
    assests / : for images or fonts or static assests

config / : contain configuratin files for ttole ans envi [configurationforwebpack]
types /: for typescript project contain interfaces
.gitingnore

build /: contain build verion of app


