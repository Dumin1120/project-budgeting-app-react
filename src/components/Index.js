import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Transaction from './Transaction';

export default function Index({ transactions, deleteTransactions }) {
    const [ checkboxes, setCheckboxes ] = useState([]);
    const history = useHistory();

    for (let i = transactions.length - 1; i >= 0; i--) {
        transactions[i].balance = Number(((transactions[i + 1] ? transactions[i + 1].balance : 0) + transactions[i].amount).toFixed(2));
    }

    useEffect(() => {
        const arr = transactions.map(tran => ({ id: tran.id, checked: false }));
        setCheckboxes(arr);
    }, [transactions])

    const setSingleCheckbox = (index) => {
        const copy = [...checkboxes];
        copy[index].checked = !copy[index].checked;
        setCheckboxes(copy);
    }
    
    const setBalanceColor = () => {
        if (transactions[0]) {
            if (transactions[0].balance >= 1000)
                return "text-success";

            if (transactions[0].balance < 0)
                return "text-danger";
        }
        return "text-dark";
    }

    const getIdsFromCheckboxes = () => checkboxes.filter(obj => obj.checked).map(obj => obj.id).join(",");

    const handleTansEdit = () => {
        const ids = getIdsFromCheckboxes();
        history.push(`/transactions/${ids}`);
    }

    const handleTransDelete = () => {
        const ids = getIdsFromCheckboxes();
        deleteTransactions(ids);
    }

    const tableHeader = (
        <thead>
            <tr className="align-middle">
                <th style={{ height: "48px" }}>Date</th>
                <th>Description</th>
                <th className="text-center">Amount</th>
                <th className="show-hide">Balance</th>
                <th className="text-center" style={{ width: "125px" }}>
                    {checkboxes.findIndex(obj => obj.checked) < 0 ? "Select" : (
                    <>
                        <button className="btn btn-info btn-sm" onClick={handleTansEdit}>Edit</button>&nbsp;
                        <button className="btn btn-danger btn-sm" onClick={handleTransDelete}>Delete</button>
                    </>)}
                </th>
            </tr>
        </thead>
    )

    return (
        <div className="transaction">
            <section>
                <table className="table table-dark table-hover align-middle">
                    <thead>
                        <tr className="table-info">
                            <th colSpan="5" className="text-center">
                                <h3 className="fw-bold">
                                    Available Balance:&emsp;
                                    <span className={setBalanceColor()}>${transactions[0] ? transactions[0].balance.toFixed(2) : "0.00"}</span>
                                </h3>
                            </th>
                        </tr>
                    </thead>
                    {tableHeader}
                    <tbody>
                        {transactions.map((tran, i) => (
                            <Transaction
                                key={tran.id}
                                transaction={tran}
                                index={i}
                                checked={checkboxes[i] ? checkboxes[i].checked : false}
                                setCheckbox={setSingleCheckbox}
                            />
                        ))}
                    </tbody>
                    {transactions.length > 3 && tableHeader}
                </table>
            </section>
        </div>
    )
}
