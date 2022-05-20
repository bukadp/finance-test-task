import React from "react";
import { Table } from 'antd';
import "antd/dist/antd.css";
import { DeleteOutlined, RiseOutlined, FallOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCustomer } from "../redux/finance-reducer";
import moment from "moment";

function TableContainer(props) {
    const tickersData = useSelector(state => state.tickersData.tickersData);
    const tickers = useSelector(state => state.financePage.tickers);
    const dispatch = useDispatch();

    const lastTradeTimeToLocalTime = (time) => {
        let localTime = moment().local(time).utcOffset(3).format('MMMM Do YYYY, HH:mm:ss');
        return localTime
}

    let defaultTicker = props.data
        ? props.data[0].ticker
        : []

    const removeTicker = (tickerId) => {
        dispatch(removeCustomer(tickerId));
    }

    const isIncrease = (tickerName) => {
        return ((tickersData[tickersData.length - 1]?.find(t => t.ticker === tickerName).change_percent) >
            (tickersData[tickersData.length - 2]?.find(t => t.ticker === tickerName).change_percent));
    }

    const mapFinanceData = (data, filteredTickers) => {
        for (let i = 0; i < tickers.length; i++) {
            filteredTickers.push(tickers[i].id);
        }
        let filteredData = data?.filter(item => filteredTickers.includes(item.ticker));
        let result;
        if (filteredData !== undefined) {
            result = filteredData.map((item) => ({
                id: item.ticker,
                key: item.ticker,
                ticker: item.ticker,
                exchange: item.exchange,
                price: item.price,
                change: item.change,
                change_percent: item.change_percent,
                dividend: item.dividend,
                yield_: item.yield,
                last_trade_time_local: lastTradeTimeToLocalTime(item.last_trade_time),
                isIncrease: isIncrease(item.ticker),
            })
            )
        }
        return result;
    }
    let financeData = useMemo(() => mapFinanceData(props.data, [defaultTicker]),
        [props.data, tickers]);

    const columns = [
        {
            title: 'Ticker',
            dataIndex: 'ticker',
            key: 'ticker',
        },
        {
            title: 'Exchange',
            dataIndex: 'exchange',
            key: 'exchange',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Dividend',
            dataIndex: 'dividend',
            key: 'dividend',
        },
        {
            title: 'Yield',
            dataIndex: 'yield_',
            key: 'yield_',
        },
        {
            title: 'Last trade time',
            dataIndex: 'last_trade_time_local',
            key: 'last_trade_time_local',
        },
        {
            title: 'Change percent',
            key: 'change_percent',
            dataIndex: 'change_percent',
        },
        {
            title: 'Trend',
            key: 'isIncrease',
            dataIndex: 'isIncrease',
            render: (isIncrease) => {
                return (
                    isIncrease
                        ? <RiseOutlined style={{ color: "green", marginLeft: 12 }} />
                        : <FallOutlined style={{ color: "red", marginLeft: 12 }} />
                )
            }
        },
        {
            title: 'Delete ticker',
            key: 'delete_ticker',
            dataIndex: 'id',
            render: (id) => {
                return (
                    <DeleteOutlined
                        onClick={() => {
                            removeTicker(id);
                        }}
                        style={{ color: "red", marginLeft: 12 }}
                    />
                );
            },
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={financeData} />
        </div>
    )
}

export default TableContainer;
