import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { apiGetTransactions } from "./utilities/apiCalls";

import NavBar from "./components/NavBar";
import Index from "./components/Index";
import New from "./components/New";
import TransactionDetails from "./components/TransactionDetails";

import NotFound from "./pages/NotFound";
import ServerErrorMsg from "./pages/ServerErrorMsg";

export default class App extends Component {
    state = { transactions: [], error: false };

    getTransactions = async () => {
        const data = await apiGetTransactions();
        if (data === "error")
            return this.setState({ error: true });
        
        this.setState({ transactions: data.reverse(), error: false });
    }

    componentDidMount() {
        this.getTransactions();
    }

    render() {
        const { transactions, error } = this.state;

        return (
            <div className="App">
                <Router>
                    <NavBar />
                    <main>
                        <Switch>
                            <Route exact path="/">
                                {error && <ServerErrorMsg />}
                                <Index
                                    transactions={transactions}
                                />
                            </Route>
                            <Route path="/transactions/new">
                                {error && <ServerErrorMsg />}
                                <New sendRequest={this.getTransactions}/>
                            </Route>
                            <Route path="/transactions/:id">
                                {error && <ServerErrorMsg />}
                                <TransactionDetails />
                            </Route>
                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </main>
                </Router>
            </div>
        )
    }
}
