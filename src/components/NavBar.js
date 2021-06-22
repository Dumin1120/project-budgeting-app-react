import { Link } from "react-router-dom";

export default function NavBar({ requestUpdate }) {
    return (
        <nav className="bg-warning budget-nav">
            <Link to="/" onClick={requestUpdate} className="nav-link h2">Budgeting App</Link>
            <Link to="/transactions/new" className="nav-link">
                <button className="btn btn-outline-primary me-2 fw-bold">Add new transaction</button>
            </Link>
        </nav>
    )
}
