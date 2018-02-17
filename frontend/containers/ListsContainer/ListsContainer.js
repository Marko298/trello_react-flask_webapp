import React, {Component, Children} from 'react'
import {connect} from 'react-redux'
import {func} from 'prop-types'
import {withRouter} from 'react-router-dom'
//components
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'
//contianers
import CardItem from '../CardItem/CardItem'
//styles
import './ListContainer.style.css'
//actions
import ListActions from '../../actions/ListAction';

class ListsContainer extends Component {
    state = {
        title: this.props.title
    }
    static defaultProps = {
        cards: []
    }

    static propTypes = {
        children: func.isRequired
    }


   _handleChange = ( {target: { name, value }} ) => 
        this.setState( (state) => {
            return {
                ...state,
                [name] : value
            }
        })

   _handleOnBlur = (e) => {

       const {title: stateTitle} = this.state
       const {title: propsTitle} = this.props

       if (stateTitle !== propsTitle) {
           this.props.update_list({
               title: this.state.title
           })
       }
       return null
   }
   _renderCardInPending = (text) => (
        <div className='card-in-pending'>
            {text}
        </div>
   )
   
   _renderCardWithAnchor = (card) => (
       <CardItem card={card} _id={this.props._id}/>
   )

    render() {

        const {
            title,
            _id,
            forBoard,
            cardsPending,
            listsPending
        } = this.props

        function isPending(currentCardId) {
            return function(_idPending) {
                return _idPending === currentCardId
            }
        }

        let isListOending = listsPending.some(isPending(_id))

        return (
            <div className='list-container-wrapper'>

                <div className='list-container-wrapper__title'>
                    <textarea
                        readOnly={isListOending}
                        name='title'
                        onBlur={this._handleOnBlur}
                        onChange={this._handleChange} 
                        className='list-container-wrapper__title-textarea' 
                    >
                        {this.state.title}
                    </textarea>
                </div>
                {this.props.cards.map(card => {
                    return (
                        <div key={card._id} className='list-container__card'>
                            {
                                cardsPending.some(isPending(card._id)) 
                                    ? this._renderCardInPending(card.title)
                                    : this._renderCardWithAnchor(card)
                            }
                        </div>
                    )
                })}

                <div>
                    {Children.only(this.props.children(_id, forBoard, isListOending))}
                </div>

            </div>
        )
    }
} 


const mapStateToProps = ( {lists} ) => ({
    cardsPending: lists.cardsPending,
    listsPending: lists.listsPending
})

const napDispatchToProps = (dispatch, props) => ({
    update_list(updates) {
        const { _id } = props
        dispatch(
            ListActions.update_list(_id,updates)
        )
    }
})

export default connect(mapStateToProps, napDispatchToProps)(ListsContainer)