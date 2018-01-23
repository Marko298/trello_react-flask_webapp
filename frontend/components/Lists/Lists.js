import React from 'react'
import Item from "../Item/Item"

//styles
import './List.css'


function List({...props}) {

    const className = props.className &&
            isObject && props.className
            ? "list ".concat( props.className.join(" "))
            : 'list'
    return (
        <ul className={className} {...props}>
            {props.children}
        </ul>
    )
}

export default List