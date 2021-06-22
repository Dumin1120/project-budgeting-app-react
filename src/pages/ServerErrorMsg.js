import React from 'react'

export default function ServerErrorMsg() {
    return (
        <div className="bg-white">
            <h2 className="text-center text-danger">
                Something unexpected happened, server is not responding.<br />
                Please try again later.
            </h2>
        </div>
    )
}
