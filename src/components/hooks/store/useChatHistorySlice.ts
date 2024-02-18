import { useMemo } from "react";
import { useTypedSelector } from "./useTypedSelector"

export const useChatHistorySlice = () => {
    const chatHistory = useTypedSelector(state => state.chatHistory);
    return useMemo(() => ({chatHistory}), [chatHistory]);
}