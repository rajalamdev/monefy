import { fetchOnlyMyTransaction } from "@/app/firebase/read";
import { FIREBASE_APP } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

interface AppContextType {
    currentUser: any;
    setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
    transactions: any;
    setTransactions: React.Dispatch<React.SetStateAction<any>>
}

const AppContext = createContext<AppContextType>({
    currentUser: null,
    setCurrentUser: () => {},
    transactions: null,
    setTransactions: () => {},
});

const useAppContext = () => useContext(AppContext);


// interface DefaultContext {
//     [x: string]: any;
// }

// const defaultState = {};

// const AppContext = createContext<DefaultContext>(defaultState);

// const useAppContext = () => useContext(AppContext)

const AppProvider = ({ children } : {children: any}) => {
    const [currentUser, setCurrentUser] = useState();
    const [transactions, setTransactions] = useState<any[]>();
    const user = getAuth(FIREBASE_APP).currentUser

    async function getMyTodosInDB() {
        if (!user) return;
          const result = await fetchOnlyMyTransaction(user.uid);
          const myTrans = result.docs.map((d) => ({ docId: d.id, ...d.data() }));
          setTransactions(myTrans)
    }
    useLayoutEffect(() => {
        getMyTodosInDB();
    }, [user]);

    const contextValue = {
        currentUser,
        setCurrentUser,
        transactions,
        setTransactions
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export { useAppContext, AppProvider };