import { Link } from "react-router-dom";

export default function NavBar({ requestUpdate }) {
    return (
        <nav className="navbar navbar-light bg-warning">
            <h2>
                <Link to="/" onClick={requestUpdate} style={{ border: "none", background: "none" }} className="page-link">Budgeting App</Link>
            </h2>
            <Link to="/transactions/new">
                <button className="btn btn-outline-primary me-2 fw-bold">Add new transaction</button>
            </Link>
        </nav>
    )
}
