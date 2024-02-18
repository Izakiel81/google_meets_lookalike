import React, { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const ReduxProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          {children}
        </PersistGate>
      </Provider>
    </div>
  );
};

export default ReduxProvider;
