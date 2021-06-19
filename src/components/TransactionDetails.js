import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { apiGetTransactionsWithIds, apiDeleteTransactions } from "../utilities/apiCalls";
import ServerErrorMsg from '../pages/ServerErrorMsg';

function TransactionDetails({ sendRequest }) {
    const [ transaction, setTransaction ] = useState([]);
    const [ failed, setFailed ] = useState(false);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const apiCall = async () => {
            const data = await apiGetTransactionsWithIds(id);
            if (data === "error" || data.length === 0)
                return history.push("/NotFound");
    
            setTransaction(data);
        }
        apiCall();
    }, [id, history])

    const deleteTran = async (id) => {
        const data = await apiDeleteTransactions(id);
        if (data === "error" || data.length === 0)
            return setFailed(true);
        
        sendRequest();
        history.push("/");
    }

    return (
        <div>
            <ul>
                {transaction.map(tran => (
                    <li key={tran.id}>
                        <h2>Transaction ID: {tran.id}</h2>
                        <h2>Name:   {tran.name}</h2>
                        <h2>Amount: {tran.amount}</h2>
                        <h2>From:   {tran.from}</h2>
                        <Link to={`/transactions/${tran.id}/edit`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => deleteTran(tran.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TransactionDetails;