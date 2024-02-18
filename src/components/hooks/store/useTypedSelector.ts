import {TypedUseSelectorHook, useSelector} from "react-redux";
import {TypeRootState} from "../../redux/store/store";


export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector;
