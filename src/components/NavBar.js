import { Link } from "react-router-dom";

export default function NavBar({ sendRequest }) {
    return (
        <nav>
            <h1>
                <Link to="/" onClick={sendRequest}>Budgeting App</Link>
            </h1>
            <button>
                <Link to="/transactions/new">Add new transaction</Link>
            </button>
        </nav>
    )
}
