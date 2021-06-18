import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <h1>
                <Link to="/">Budgeting App</Link>
            </h1>
            <button>
                <Link to="/transactions/new">Add new transaction</Link>
            </button>
        </nav>
    )
}
