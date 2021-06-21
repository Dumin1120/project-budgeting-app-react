import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { apiGetTransactionsByIds, apiPutTransactions } from "../utilities/apiCalls";

export default function TransactionEdit({ prevIds }) {
    const [ transaction, setTransaction ] = useState({});
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
            return history.push("/NotFound");

        goBack();
    }

    const goBack = () => {
        history.push(`/transactions/${prevIds}`);
    }

    return (
        <div>
            <br />
            <br />
            <form className="row g-3" onSubmit={handleSubmit} key={transaction.id}>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-1 col-form-label fw-bold">Name:</label>
                    <div className="col-sm-4">
                        <input
                            className="form-control"
                            type="text"
                            id="name" 
                            value={transaction.name}
                            placeholder="Name of transaction"
                            onChange={handleTextChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="amount" className="col-sm-1 col-form-label fw-bold">Amount:</label>
                    <div className="col-sm-4">
                        <input
                            className="form-control"
                            type="number"
                            id="amount"
                            value={transaction.amount}
                            placeholder="Format: 1 or -12.34"
                            onChange={handleTextChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="date" className="col-sm-1 col-form-label fw-bold">Date:</label>
                    <div className="col-sm-4">
                        <input
                            className="form-control"
                            type="text"
                            id="date"
                            value={transaction.date}
                            placeholder="Format: mm/dd/yy"
                            onChange={handleTextChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="from" className="col-sm-1 col-form-label fw-bold">From:</label>
                    <div className="col-sm-4">
                        <input
                            className="form-control"
                            type="text"
                            id="from"
                            value={transaction.from}
                            placeholder="Optional"
                            onChange={handleTextChange}
                        />
                    </div>
                </div>
                <br />
                <div className="col-12">
                    <button type="submit" className="btn btn-info" style={{ width: "100px" }}>Update</button>
                </div>
            </form>
            <br />
            <button className="btn btn-primary" style={{ width: "100px" }} onClick={goBack}>Go Back</button>
        </div>
    )
}
