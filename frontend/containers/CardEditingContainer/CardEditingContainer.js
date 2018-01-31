import React, {Component} from 'react'
import {connect} from 'react-redux'
//styles
import './CardEditingContainer.style.css'
//components
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'
import Textarea from '../../components/Textarea/Textarea'
//HOC
import withToggleBTWComponents from '../../HOC/withToggleBTWComponents'
import withEditMode from '../../HOC/withEditMode'
//containers
import AddDescriptionForm from '../../containers/AddDescriptionForm/AddDescriptionForm'
//actions
import PopupActions from '../../actions/EditModeAction';


const actionsForMenuListLabels = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_menu_labelList
})
let ToggleLabelListBtn = withEditMode(actionsForMenuListLabels)(Button)



class CardEditingContainer extends Component {
   
    componentDidMount() {
        console.log("componentDidMount CardEditingContainer", this.props)
    }
    render() {
        const {list, list: {cards}} = this.props
        return (
            <div>
                <header>
                    <Title text={list.title} large bold />
                    from list: <Title text={cards.title} medium />
                </header>
                <section className='editing-container'>
                    <div className='editing-left'>
                        <div>
                            <AddDescriptionForm card={cards} description={cards.description}/>
                        </div>
                        <div>
                            Comments Component
                        </div>
                        <div>
                            Activity component
                        </div>
                    </div>
                    <div className='editing-right'>
                        <ToggleLabelListBtn selected={cards}>
                            Add labels
                        </ToggleLabelListBtn>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = ({lists: {boardProject}}, ownProps) => ({
    list: boardProject.lists.map(list => {

        const currentCardId = ownProps.match.params.cardId
        const currentListId = ownProps.match.params.listId

        if(list._id === currentListId) {
            return {
                ...list,
                cards: list.cards.filter(card => card._id === currentCardId)[0]
            }
        }
    }).filter(o => o)[0]
})

// const mapDispatchToProps = (dispatch) => ({
//     toggle_labelList() {
//         dispatch( PopupActions.() )
//     }
// })

export default connect(mapStateToProps, null)(CardEditingContainer)