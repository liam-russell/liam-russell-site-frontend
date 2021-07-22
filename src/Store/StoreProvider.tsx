import { observer } from "mobx-react-lite";
import React, { createContext, PropsWithChildren, useContext } from "react";
import GlobalStore from "./GlobalStore";

export const storeContext = createContext<GlobalStore | undefined>(undefined);
export const errorHandlingContext = createContext<((error: Error) => void) | undefined>(undefined);

export const useStore = () => {
    const stores = useContext(storeContext);
    if (!stores) {
        throw new Error('useStores must be used within a ContextProvider.');
    }
    return stores;
};

const ErrorThrower = observer(({ children }: PropsWithChildren<unknown>) => {
    const store = useStore();
    if(store.error) {
        throw store.error;
    }

    return <>{children}</>
});

export const StoreProvider = ({ children }: PropsWithChildren<unknown>) => {
    const store = new GlobalStore();
    return <storeContext.Provider value={store}>
        <ErrorThrower>
            {children}
        </ErrorThrower>
    </storeContext.Provider>;
};
