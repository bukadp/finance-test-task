const GET_TICKER_INFO = 'GET_TICKER_INFO';

const initialState = {
    tickersData: [
    ]
}

const tickersDataReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TICKER_INFO:
            return {...state, tickersData: [...state.tickersData, ...action.payload]};

        default:
            return state;
    }
}

export const getTickersData = (payload) => ({type: GET_TICKER_INFO, payload});


export default tickersDataReducer;
