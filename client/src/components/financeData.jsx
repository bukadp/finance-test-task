import React, { useEffect } from 'react';
import { socket } from '../context/socket';
import TableContainer from "./tableContainer";
import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addTicker, removeCustomer } from "../redux/finance-reducer";
import { getTickersData } from "../redux/data-reducer";

function FinanceData(props) {
    const dispatch = useDispatch();
    const tickers = useSelector(state => state.financePage.tickers);
    const tickersData = useSelector(state => state.tickersData.tickersData);

    useEffect(() => {
        socket.emit('start');
        socket.on('ticker', (data) => {
            dispatch(getTickersData([data]))
        });
    }, [dispatch]);

    function onChange(e) {
        const ticker = {
            ticker: e.target.value,
            id: e.target.value,
        }
        if (e.target.checked === true) {
            dispatch(addTicker(ticker));
        } else {
            removeTicker(ticker);
        }
    }

    const removeTicker = (ticker) => {
        dispatch(removeCustomer(ticker.id));
    }

    const isChecked = (tickerName) => {
        return tickers.find(t => t.ticker === tickerName);
    }

    return (
        <div style={{marginTop: "20px" }}>
            <span style={{ fontSize: "18px", marginLeft: "20px" }}>Choose the ticker you want to track</span>
            <div>
                {tickersData[tickersData.length - 1]?.map((res) => {
                    return (
                        <Checkbox style={{margin: "0px 0px 20px 20px" }}
                            onChange={onChange}
                            key={res.ticker}
                            value={res.ticker}
                            checked={isChecked(res.ticker)}
                            >
                            {res.ticker}
                        </Checkbox>
                    )
                })}
            </div>
            <div>
                <TableContainer data={tickersData[tickersData.length - 1]} />
            </div>
        </div>
    );
}

export default FinanceData;
