import React from 'react';
import { Link } from "react-router-dom";

export default function Transaction({ transaction }) {
    return (
        <tr>
            <td>
                {transaction.date}
            </td>
            <td>
                {transaction.name}
            </td>
            <td>
                {transaction.amount}
            </td>
            <td>
                <Link to={`/transactions/${transaction.id}`}>
                    <button>...</button>
                </Link>
            </td>
        </tr>
    )
}
/*
<td>
<a href={bookmark.url} target="_blank" rel="noreferrer">
    {bookmark.name}✏️
</a>
</td>
*/