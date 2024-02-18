import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { chatHistorySlice } from "./chat-history/ChatHistory.slice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const presistConfig = {
    key: 'chat-test',
    storage,
    whitelist: ['auth'],
}

const rootReducer = combineReducers({
  chatHistory: chatHistorySlice.reducer,
});


const persistedReducer = persistReducer(presistConfig, rootReducer); 

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    } as any),
});
export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;

