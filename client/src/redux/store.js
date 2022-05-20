import {applyMiddleware, combineReducers} from "redux";
import financeReducer from "./finance-reducer";
import { legacy_createStore as createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import tickersDataReducer from "./data-reducer";

let reducers = combineReducers({
    financePage: financeReducer,
    tickersData: tickersDataReducer,
});

let store = createStore(reducers, composeWithDevTools (applyMiddleware(thunk)));

export default store;
