import React from 'react';
import { Link } from "react-router-dom";
import { moneyFormatter } from '../utilities/formatter';

export default function Transaction({ transaction, index, checked, setCheckbox }) {
    return (
        <tr className={transaction.amount < 0 ? "table-danger" : "table-success"}>
            <td>
                {transaction.date}
            </td>
            <td>
                <Link to={`/transactions/${transaction.id}`}>
                    {transaction.name}
                </Link>
            </td>
            <td className="text-center">
                {moneyFormatter(transaction.amount)}
            </td>
            <td className="text-center">
                {moneyFormatter(transaction.balance)}
            </td>
            <td className="text-center">
                <input type="checkbox" checked={checked} onChange={() => setCheckbox(index)} />
            </td>
        </tr>
    )
}
