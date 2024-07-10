import { createContext, useContext, useEffect, useState } from "react";

// interface AppContextType {
//     currentUser: any;
//     setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
// }

// const AppContext = createContext<AppContextType>({
//     currentUser: null,
//     setCurrentUser: () => {},
// });

// const useAppContext = () => useContext(AppContext);

// const useAppContext = () => useContext(AppContext);

interface DefaultContext {
    [x: string]: any;
}

const defaultState = {};

const AppContext = createContext<DefaultContext>(defaultState);

const useAppContext = () => useContext(AppContext)

const AppProvider = ({ children } : {children: any}) => {
    const [currentUser, setCurrentUser] = useState();

    const contextValue = {
        currentUser,
        setCurrentUser,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export { useAppContext, AppProvider };