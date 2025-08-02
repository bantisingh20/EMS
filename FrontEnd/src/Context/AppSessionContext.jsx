import React,{useState, useEffect, useContext,createContext} from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppSessionProvider = ({children}) =>{
     const [currentModule, setCurrentModule] = useState(1);

    return (
        <AppContext.Provider value={{currentModule, setCurrentModule}} >
            {children}
        </AppContext.Provider>
    )
}