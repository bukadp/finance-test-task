const ADD_TICKER = 'SET_TICKER';
const REMOVE_TICKER = 'REMOVE_TICKER'

const initialState = {
    tickers: [
        {
            ticker: 'AAPL',
            id: 'AAPL',
        }
    ]
}

const financeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TICKER:
           return {...state, tickers: [...state.tickers, action.payload]};

        case REMOVE_TICKER:
            return {...state, tickers: state.tickers.filter(ticker => ticker.id !== action.payload)};

        default:
            return state;
    }
}

export const addTicker = (payload) => ({type: ADD_TICKER, payload});
export const removeCustomer = (payload) => ({type: REMOVE_TICKER, payload});

export default financeReducer;
