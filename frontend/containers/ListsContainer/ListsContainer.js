import React, {Component, Children} from 'react'
import {connect} from 'react-redux'
import {func} from 'prop-types'
import {Link, withRouter} from 'react-router-dom'

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

    static propTypes = {
        children: func.isRequired
    }

    // handleClick = (e) => {
    //     this.props.create_card("iii")
    // }

    componentDidMount() {

    }

    render() {

        const {
            title,
            _id,
            forBoard
        } = this.props

        return (
            <div>

                <div className='list-header'>
                    <Title text={title} bold large/>
                </div>
                {this.props.cards.map(card => {
                    return (
                        <div key={card._id}>
                            <Link to={{
                                pathname: `/card/${card._id}/${_id}`,
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
                    {/* <Button onClick={this.handleClick}>
                        create card
                    </Button> */}
                    {Children.only(this.props.children(_id, forBoard))}
                </div>

            </div>
        )
    }
} 

// const mapDispatchToProps = (dispatch, ownProps) => ({
//     create_card(title) {
//         let {_id: listId} = ownProps
//         let data = {title}
//         dispatch(CardActions.create_card_request(listId, data))
//     }
// })

export default connect(null, null)(ListsContainer)