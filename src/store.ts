import {applyMiddleware, combineReducers, createStore} from "redux";
import todolistReducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    todolist: todolistReducer
});

export type RootReducerType = typeof rootReducer //(global state: AppStateType) => globalState: AppStateType
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;
