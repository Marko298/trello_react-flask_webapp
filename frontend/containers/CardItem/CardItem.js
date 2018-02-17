import React, {Component} from 'react'
import {Link} from 'react-router-dom'



function Image({src}) {
    return (
        <div>
            <img src={src} style={{width: '100%'}}/>
        </div>
    )
}

class CardItem extends Component {
    render() {
        const {card} = this.props
        return (
            <Link to={{
                pathname: `/card/${card._id}/${this.props._id}`,
                state: {
                    modal: true
                }
            }}>
                {card.attachments.assigned && <Image src={card.attachments.assigned}/>}
                {card.title}
            </Link>
        )
    }
}

export default CardItem