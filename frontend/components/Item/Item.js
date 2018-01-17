import React, {Component} from 'react'

import "./Item.css"

// function Item({title, children}) {
//     return (
//     )
// }

class Item extends Component {

    // buttonProps = ({onClick, ...props} = {}) => {
    //     return {
    //         onClick: (...args) => {
    //             onClick && onClick(...args)
    //             props._id && console.log("HAHAH", props.id)
    //         },
    //         _id: this.props._id,
    //         ...props
    //     }
    // }
    
    render() {
        const {title, children} = this.props
        return (
            <li className='item'>
                <span className='item-title'>{title}</span>
                {children}
                {this.props.render()}
            </li>
        )
    }
}


export default Item