import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { apiGetTransactionsByIds, apiDeleteTransactions } from "../utilities/apiCalls";
import { moneyFormatter } from "../utilities/formatter";

export default function TransactionDetails({ requestUpdate, setPrevIds }) {
    const [ transactions, setTransactions ] = useState([]);
    const history = useHistory();
    const { id } = useParams();
    const counter = useRef(0);

    useEffect(() => {
        const apiCall = async () => {
            const data = await apiGetTransactionsByIds(id);
            if (data === "error" || !data.length)
                return history.push("/NotFound");

            counter.current = data.length;
            setPrevIds(id);
            setTransactions(data);
        }
        apiCall();
    }, [id, history, setPrevIds])

    const deleteTransaction = async (id, index) => {
        const data = await apiDeleteTransactions(id);
        if (data === "error" || !data.length)
            return history.push("/NotFound");
        
        counter.current--;
        if (counter.current !== 0) {
            const copy = [...transactions];
            copy.splice(index, 1);
            return setTransactions(copy);
        }

        goBack();
    }

    const goBack = () => {
        requestUpdate();
        history.push("/");
    }

    return (
        <div className="text-center align-middle w-auto">
            <br />
            {transactions.map((tran, i) => {
                const borderStyle = {
                    border: `3px solid ${tran.amount < 0 ? "#dc3545" : "#28a745"}`,
                    borderRadius: "15px",
                    padding: "5px",
                    display: "inline-block",
                    background: "#51585f"
                };
                return (
                    <div style={borderStyle} key={tran.id}>
                        <table className="table table-borderless w-auto fs-5 text-white" >
                            <tbody>
                                <tr>
                                    <td>ID: {tran.id}</td>
                                </tr>
                                <tr>
                                    <td>Name: {tran.name}</td>
                                </tr>
                                <tr>
                                    <td>Amount: ${moneyFormatter(tran.amount)}</td>
                                </tr>
                                <tr>
                                    <td>From: {tran.from}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <button className="btn btn-primary" style={{ marginRight: "20px" }} onClick={goBack}>Go Back</button>
                                        <Link to={`/transactions/${tran.id}/edit`}>
                                            <button className="btn btn-info" style={{ width: "90px" }}>Edit</button>
                                        </Link>
                                        <button className="btn btn-danger" style={{ marginLeft: "20px" }} onClick={() => deleteTransaction(tran.id, i)}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </div>
    )
}
