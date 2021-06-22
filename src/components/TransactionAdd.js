import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiPostTransactions } from "../utilities/apiCalls";
import "./TransactionAdd.css";

export default function TransactionAdd({ requestUpdate }) {
    const history = useHistory();
    const [ failed, setFailed ] = useState(false);
    const [ transaction, setTransaction ] = useState({
        date: "",
        name: "",
        amount: "",
        from: ""
    })

    useEffect(() => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yy = String(today.getFullYear()).slice(2);
        today = mm + '/' + dd + '/' + yy;
        setTransaction(prev => ({ ...prev, date: today }));
    },[])

    const handleTextChange = (event) => {
        const { id, value } = event.target;
        setTransaction({ ...transaction, [id]: (id === "amount" ? Number(value) : value) });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        apiCall();
    }

    const apiCall = async () => {
        const data = await apiPostTransactions(transaction);
        if (data === "error")
            return setFailed(true);
        
        goBack();
    }

    const goBack = () => {
        requestUpdate();
        history.push("/");
    }

    return (
        <div className="text-center">
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
                <button type="submit" className="btn btn-info text-center add-margin">Create new transaction</button>
            </form>
            <br />
            <button className="btn btn-primary add-margin" style={{ width: "150px" }} onClick={goBack}>Go Back</button>
        </div>
    )
}
