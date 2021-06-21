import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { apiDeleteTransactions, apiGetTransactions } from "./utilities/apiCalls";

import NavBar from "./components/NavBar";
import Index from "./components/Index";
import TransactionAdd from "./components/TransactionAdd";
import TransactionDetails from "./components/TransactionDetails";
import TransactionEdit from "./components/TransactionEdit";

import NotFound from "./pages/NotFound";

export default class App extends Component {
    state = { transactions: [], prevIds: "", error: false };

    getTransactions = async () => {
        const data = await apiGetTransactions();
        if (data === "error")
            return this.setState({ error: true });
        
        this.setState({ transactions: data.reverse(), error: false });
    }

    deleteTransactions = async (ids) => {
        const data = await apiDeleteTransactions(ids);
        if (data === "error" || !data.length)
            return this.setState({ error: true });

        this.getTransactions();
    }

    setPrevIds = (ids) => {
        this.setState({ prevIds: ids });
    }

    componentDidMount() {
        this.getTransactions();
    }

    render() {
        const { transactions, prevIds, error } = this.state;

        return (
            <div className="bg-secondary" style={{ position: "absolute", top: "0px", bottom: "0px", left: "0px", right: "0px", overflowY: "auto" }}>
                <Router>
                    <NavBar requestUpdate={this.getTransactions} />
                    <main>
                        <Switch>
                            <Route exact path="/">
                                {error && <NotFound />}
                                <Index transactions={transactions} deleteTransactions={this.deleteTransactions} />
                            </Route>
                            <Route path="/transactions/new">
                                <TransactionAdd requestUpdate={this.getTransactions}/>
                            </Route>
                            <Route exact path="/transactions/:id">
                                <TransactionDetails requestUpdate={this.getTransactions} setPrevIds={this.setPrevIds} />
                            </Route>
                            <Route path="/transactions/:id/Edit">
                                <TransactionEdit prevIds={prevIds} />
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
