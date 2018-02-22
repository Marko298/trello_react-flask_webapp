import React, {Component, Fragment} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {Motion, spring, presets} from 'react-motion'

//components
import Button from '../../components/Button/Button'
import Title from '../../components/Title/Title'
// import Input from '../Input/Input'
import Input from '../../components/Input/Input'
//containers
import AddListForm from '../AddListForm/AddListForm'
import ListsContainer from '../ListsContainer/ListsContainer'
import AddCardForm from '../AddCardForm/AddCardForm'
//actions
import PopupActions from '../../actions/EditModeAction'
import ListActions from '../../actions/ListAction'
//styles
import './BoardPage.style.css'
//HOC
import withEditMode from '../../HOC/withEditMode'


const actionForShowFormThatUpdateNameBoard = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_update_boardname
})

let ChangeBoardNameBtn = withEditMode(actionForShowFormThatUpdateNameBoard)(Button)


class BoardPage extends Component {
    state = {
        isListsLoaded: false
    }

    static defaultProps = {
        lists: [],
        isPostRequstPending: false
    }
   
    handleClickMenuToggle = (e) => {
        this.props.toggle_menu()
    }

    componentDidMount() {
        const {board: {lists}, fetch_list, match} = this.props
        if(lists.length) {
            this._setLodForList(true)
            fetch_list(match.params.boardId).then( () => this._setLodForList(false) )
        }
    }

    _setLodForList = (indicator) => 
        this.setState( (state) => ({
        ...state,
        isListsLoaded: indicator})
    )

    componentWillUnmount() {
        if(this.props.board.lists.length) {
            this.props.clear_project_data()
        }
    }

    componentWillReceiveProps(next) {
        if(this.props.location.key !== next.location.key) {
            const {match: {params: boardIdNext }, board: {lists: nextLists}} = next
            const {match: {params: boardIdCurrent }, clear_project_data, fetch_list} = this.props

            if (boardIdNext.boardId !== boardIdCurrent.boardId ) {
                clear_project_data()
                if( nextLists.length ) {
                    this._setLodForList(true)
                    fetch_list( boardIdNext.boardId ).then( () => this._setLodForList(false) )  
                }
            } 
        }
    }

    _boundElement = (element) => {
        if (this.offsetTop) return
        this.offsetTop = element.getBoundingClientRect().bottom
    }
   
    _header = (boardName, isImportant, reletedTo) => {
        return (
            <header
                style={{
                    backgroundColor: this.props.board.styleSettings.backgroundColor || 'blue'
                }} 
                className="board-page__header-toolbar" 
                ref={this._boundElement}
            >
                <div className='board-page__header-toolbar--left'>
                    <ChangeBoardNameBtn customTop={this.offsetTop} selected={{
                        _id: this.props.board._id,
                        boardName
                    }}>
                        <Title text={boardName} large bold color='#ffffff'/>
                    </ChangeBoardNameBtn>
                    <span>
                        <Input 
                            type='checkbox' 
                            name='isImportant' 
                            checked={isImportant}
                        />
                    </span>
                    <Title text={reletedTo.teamName} medium tiny color='#ffffff'/>
                </div>
                <div className='board-page__header-toolbar--right'>
                    { !this.props.isMenuInBoardPageShow &&
                    <Button onClick={this.handleClickMenuToggle}>
                        Show Menu
                    </Button> }
                </div>
            </header>
        )
    }

    render() {
  
        const {board:
            {boardName, isImportant, reletedTo},
            isMenuInBoardPageShow
        } = this.props

        const {isListsLoaded} = this.state

        return (
            <Fragment>
                <Motion style={{x: spring(isMenuInBoardPageShow ? 340 : 0)}}>
                {({x}) => (
                    <div className='board-wrapper' style={{
                        marginRight: `${x}px`,
                        backgroundColor: this.props.board.styleSettings.backgroundColor || 'blue'
                    }}>
                        <div className='board-content'>
                            {this._header(boardName, isImportant, reletedTo)}
                            <div className='board-canvas'>
                                <section className='list-container'>
                                    {this.props.lists.map(list => {
                                        return (
                                            <div className='column'>
                                                <ListsContainer {...list} >
                                                    {(listId, boardId, isListOending) => 
                                                        <AddCardForm boardId={boardId} forList={listId} isListOending={isListOending}/>}
                                                </ListsContainer>
                                            </div>
                                        )
                                    })}
                                    <div className='column'>
                                        <AddListForm disabled={isListsLoaded}/>
                                    </div>

                                </section>
                            </div>
                        </div>

                    </div>
                )}
                </Motion>
                <Motion style={{route: spring(!isMenuInBoardPageShow ? 340 : 0)}}>
                    { ({route}) => {
                        return (
                            <div className='menu-container' style={{
                                    WebkitTransform: `translate3d(${route}px, 0, 0)`,
                                    transform: `translate3d(${route}px, 0, 0)`,
                                    display: route === 340 && !isMenuInBoardPageShow ? 'none' : 'block'

                                }}>
                                <div className='menu-wrapper'>
                                    menu
                                    <Button onClick={this.handleClickMenuToggle}>
                                        x
                                    </Button>
                                </div>
                            </div>
                        )
                    }}
                </Motion>
            </Fragment>
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
        return dispatch(ListActions.fetch_project_lists_with_cards(boardId))
    },
    clear_project_data() {
        dispatch(ListActions.clear_project_data())
    },
   
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)

