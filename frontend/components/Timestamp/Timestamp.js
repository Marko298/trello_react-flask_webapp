import React from 'react'

import moment from 'moment'

export default function Timestamp({
    time,
    ...props
}) {
    return (
        <span>
            {moment(time).fromNow()}
        </span>
    )
}