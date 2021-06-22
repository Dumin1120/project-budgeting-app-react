import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { apiGetTransactionsByIds, apiPutTransactions } from "../utilities/apiCalls";
import "./TransactionAdd.css";

export default function TransactionEdit({ prevIds }) {
    const [ transaction, setTransaction ] = useState({});
    const [ failed, setFailed ] = useState(false);
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        const apiCall = async () => {
            const data = await apiGetTransactionsByIds(id);
            if (data === "error" || !data.length)
                return history.push("/NotFound");
    
            setTransaction(data[0]);
        }
        apiCall();
    }, [id, history])

    const handleTextChange = (event) => {
        const { id, value } = event.target;
        setTransaction({ ...transaction, [id]: id === "amount" ? Number(value) : value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await apiPutTransactions(id, transaction);
        if (data === "error" || !data.length)
            return setFailed(true);

        goBack();
    }

    const goBack = () => {
        history.push(`/transactions/${prevIds}`);
    }

    return (
        <div className="text-center">
            <br />
            <br />
            {failed && <div className="text-info">
                <h4>Please use correct data format or valid data.</h4>
                <h4>Name can not be empty or only spaces.</h4>
                <h4>Amount can not be more than 2 decimal digits.</h4>
                <h4>Date (mm/dd/yy) has to be a valid date after Year 2020.</h4>
            </div>}
            <form className="form" onSubmit={handleSubmit} key={transaction.id}>
                <div>
                    <label className="label" htmlFor="name">Name:</label>
                    <input
                        className="input-box"
                        type="text"
                        id="name" 
                        value={transaction.name}
                        placeholder="Name of transaction"
                        onChange={handleTextChange}
                        required
                    />
                </div>
                <div>
                    <label className="label" htmlFor="amount">Amount:</label>
                    <input
                        className="input-box"
                        type="number"
                        id="amount"
                        value={transaction.amount}
                        placeholder="Format: 1 or -12.34"
                        onChange={handleTextChange}
                        required
                    />
                </div>
                <div>
                    <label className="label" htmlFor="date">Date:</label>
                    <input
                        className="input-box"
                        type="text"
                        id="date"
                        value={transaction.date}
                        placeholder="Format: mm/dd/yy"
                        onChange={handleTextChange}
                        required
                    />
                </div>
                <div>
                    <label className="label" htmlFor="from">From:</label>
                    <input
                        className="input-box"
                        type="text"
                        id="from"
                        value={transaction.from}
                        placeholder="Optional"
                        onChange={handleTextChange}
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-info text-center add-margin">Update Transaction</button>
            </form>
            <br />
            <button className="btn btn-primary add-margin" style={{ width: "150px" }} onClick={goBack}>Go Back</button>
        </div>
    )
}
