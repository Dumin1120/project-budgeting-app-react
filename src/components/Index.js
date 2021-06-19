import React from 'react';
import Transaction from './Transaction';

export default function Index({ transactions }) {
    return (
        <div className="transaction">
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>col one</th>
                            <th>col two</th>
                            <th>col 3</th>
                            <th>col 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tran => {
                            return (
                                <Transaction
                                    key={tran.id}
                                    transaction={tran}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
