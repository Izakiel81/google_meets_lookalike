import { useDispatch } from "react-redux";
import { chatHistorySlice } from "../../redux/store/chat-history/ChatHistory.slice";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";

const rootActions = {
    ...chatHistorySlice.actions,    
}

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
}