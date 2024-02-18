import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ChatHistory } from './ChatHistory.types';


const initialState: ChatHistory = {
    messages: [],
};


export const chatHistorySlice = createSlice({
    name: 'chatHistory',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<string>) => {
            state.messages.push(action.payload);
        },
    },
});
