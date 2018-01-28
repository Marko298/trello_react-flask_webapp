import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import slug from 'slug'

//actions
import CardActions from '../../actions/CardAction'

//components
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'






class ListsContainer extends Component {
    state = {
        cardTitle: ''
    }
    static defaultProps = {
        cards: []
    }

    handleClick = (e) => {
        this.props.create_card("iii")
    }

    render() {

        const {
            title
        } = this.props

        return (
            <div>

                <div className='list-header'>
                    <Title text={title} bold large/>
                </div>
                {this.props.cards.map(card => {
                    return (

                        <div>
                            <Link to={{
                                pathname: `/card/${card._id}/${slug(title)}`,
                                state: {
                                    modal: true
                                }
                            }}>
                                {card.title}
                            </Link>
                        </div>
                    )
                })}

                <div>
                    <Button onClick={this.handleClick}>
                        create card
                    </Button>
                </div>

            </div>
        )
    }
} 

const mapDispatchToProps = (dispatch, ownProps) => ({
    create_card(title) {
        let {_id: listId} = ownProps
        let data = {title}
        dispatch(CardActions.create_card_request(listId, data))
    }
})

export default connect(null, mapDispatchToProps)(ListsContainer)