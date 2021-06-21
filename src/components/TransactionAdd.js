import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiPostTransactions } from "../utilities/apiCalls";

function New({ requestUpdate }) {
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
        <div>
        <br />
        <br />
            {failed && <h1>Please use correct data format or valid data.</h1>}
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
                    <button type="submit" className="btn btn-info">Create new transaction</button>
                </div>
            </form>
            <br />
            <button className="btn btn-primary" style={{ width: "150px" }} onClick={goBack}>Go Back</button>
        </div>
    )
}

export default New;
