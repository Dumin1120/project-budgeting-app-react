import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiPostTransactions } from "../utilities/apiCalls";

function New({ sendRequest }) {
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
        
        sendRequest();
        history.push("/");
    }

    return (
        <div className="New">
            {failed && <h1>Please use correct data format or valid data.</h1>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    value={transaction.name}
                    placeholder="Name of transaction"
                    onChange={handleTextChange}
                    required
                />
                <label htmlFor="amount">Amount:</label>
                <input
                    id="amount"
                    type="number"
                    value={transaction.amount}
                    placeholder="Format: 1 or -12.34"
                    onChange={handleTextChange}
                    required
                />
                <label htmlFor="date">Date:</label>
                <input
                    id="date"
                    type="text"
                    value={transaction.date}
                    placeholder="Format: mm/dd/yy"
                    onChange={handleTextChange}
                    required
                />
                <label htmlFor="from">From:</label>
                <input
                    id="from"
                    type="text"
                    value={transaction.from}
                    placeholder="Optional"
                    onChange={handleTextChange}
                />
                <br />
                <input type="submit" />
            </form>
        </div>
    )
}

export default New;
