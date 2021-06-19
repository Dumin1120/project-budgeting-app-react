import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { apiGetTransactionsWithIds, apiPutTransactions } from "../utilities/apiCalls";

export default function TransactionEdit() {
    const [ transaction, setTransaction ] = useState([]);
    const [ failed, setFailed ] = useState(false);
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        const apiCall = async () => {
            const data = await apiGetTransactionsWithIds(id);
            if (data === "error" || data.length === 0)
                return history.push("/NotFound");
    
            setTransaction(data);
        }
        apiCall();
    }, [id, history])

    const handleTextChange = (event) => {
        const { id, value } = event.target;
        setTransaction([{ ...transaction[0], [id]: (id === "amount" ? Number(value) : value) }]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const idRemoved = transaction.map(tran => {
            delete tran.id;
            return tran;
        })
        const data = await apiPutTransactions(id, idRemoved);
        if (data === "error" || data.length === 0)
            return setFailed(true);

        //update? <==============
        history.push(`/transactions/${id}`);
    }

    return (
        <div>
            {transaction.map(tran => {
                return <form onSubmit={handleSubmit} key={tran.id}>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={tran.name}
                        placeholder="Name of transaction"
                        onChange={handleTextChange}
                        required
                    />
                    <label htmlFor="amount">Amount:</label>
                    <input
                        id="amount"
                        type="number"
                        value={tran.amount}
                        placeholder="Format: 1 or -12.34"
                        onChange={handleTextChange}
                        required
                    />
                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        type="text"
                        value={tran.date}
                        placeholder="Format: mm/dd/yy"
                        onChange={handleTextChange}
                        required
                    />
                    <label htmlFor="from">From:</label>
                    <input
                        id="from"
                        type="text"
                        value={tran.from}
                        placeholder="Optional"
                        onChange={handleTextChange}
                    />
                    <br />
                    <input type="submit" />
                </form>
            })}
        </div>
    )
}
