import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
//components
import Button from '../../components/Button/Button'
import Title from '../../components/Title/Title'
import Input from '../Input/Input'

//containers
import AddListForm from '../AddListForm/AddListForm'
import ListsContainer from '../ListsContainer/ListsContainer'
import AddCardForm from '../AddCardForm/AddCardForm'
//actions
import PopupActions from '../../actions/EditModeAction'
import ListActions from '../../actions/ListAction'
//styles
import './BoardPage.style.css'


class BoardPage extends Component {

    static defaultProps = {
        lists: [],
        isPostRequstPending: false,
    }

    handleClickMenuToggle = (e) => {
        this.props.toggle_menu()
    }
    componentDidMount() {
        console.log("componentDidMount", this.props)
        this.props.fetch_list(this.props.match.params.boardId)
    }

    componentWillUnmount() {
        // this.props.clear_project_data()
    }

    render() {
  
        const {board:
            {boardName, isImportant, reletedTo},
            isMenuInBoardPageShow
        } = this.props

        return (
            <div className='board-wrapper'>
                <div className='board-content'>
                    <header style={{display: 'flex'}}>
                        <Title text={boardName} large bold/>
                        <span>
                            <Input 
                                type='checkbox' 
                                name='isImportant' 
                                checked={isImportant}
                            />
                        </span>
                        <Title text={reletedTo.teamName} large bold/>
                        <button onClick={this.handleClickMenuToggle}>
                            Show Menu
                        </button>
                    </header>

                    <div className='board-canvas'>
                        <section className='list-container'>
                            {this.props.lists.map(list => {
                                return (
                                    <div className='column'>
                                        <ListsContainer {...list} >
                                            {(listId, boardId) => <AddCardForm boardId={boardId} forList={listId}/>}
                                        </ListsContainer>
                                    </div>
                                )
                            })}
                            <div className='column' id="test">
                                <AddListForm/>
                            </div>

                        </section>
                    </div>
                </div>

                <div className='menu-container' style={{display: isMenuInBoardPageShow ? 'block' : 'none'}}>
                {/* Here this component could be imported like <SideBoardMenu /> */}
                    <div className='menu-wrapper'>
                        menu
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({
    lists: {status},
    lists: {boardProject},
    mode: {isMenuInBoardPageShow, menu}
}) => ({
    lists: boardProject.lists,
    isPostRequstPending : status.isPostRequstPending,
    isMenuInBoardPageShow: isMenuInBoardPageShow,
})

const mapDispatchToProps = (dispatch) => ({
    toggle_menu() {
        dispatch(PopupActions.toggle_menu_on_boardPage())
    },
    fetch_list(boardId) {
        dispatch(ListActions.fetch_project_lists_with_cards(boardId))
    },
    clear_project_data() {
        dispatch(ListActions.clear_project_data())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)

