import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory, withRouter } from "react-router-dom";
import { apiGetTransactionsWithIds } from "../utilities/apiCalls";
import ServerErrorMsg from '../pages/ServerErrorMsg';

function TransactionDetails() {
    const [ transaction, setTransaction ] = useState([]);
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

    return (
        <div>
            <ul>
                {transaction.map(tran => (
                    <li key={tran.id}>
                        <h2>Transaction ID: {tran.id}</h2>
                        <h2>Name:   {tran.name}</h2>
                        <h2>Amount: {tran.amount}</h2>
                        <h2>From:   {tran.from}</h2>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default withRouter(TransactionDetails)