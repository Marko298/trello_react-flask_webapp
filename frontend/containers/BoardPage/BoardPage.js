import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
//components
import Button from '../../components/Button/Button'
import Title from '../../components/Title/Title'
import Input from '../Input/Input'
//containers
// import Popup from '../Popup/Popup'
import AddListForm from '../AddListForm/AddListForm'
import ListsContainer from '../ListsContainer/ListsContainer'
//HOC
// import withEditMode from '../../HOC/withEditMode'
//actions
import PopupActions from '../../actions/EditModeAction'
//styles
import './BoardPage.style.css'




    



// let actionCreateList = () => ({
//     toggle: PopupActions.toggle_editMode,
//     menu: PopupActions.toggle_create_list_menu
// })
// let CreateList = withEditMode(actionCreateList)(Button)

class BoardPage extends Component {

    // state = {
    //     customLeft: 0
    // }

    static defaultProps = {
        lists: [],
        isPostRequstPending: false,
    }

    handleClickMenuToggle = (e) => {
        this.props.toggle_menu()
    }

    componentDidUpdate(prev) {
        if(prev.lists.length !== this.props.lists.length) {
            // let {width, left, top} = this.button.getBoundingClientRect()

            // this.setState(function(prevState) {
            //     return {
            //         customLeft: this.button.offsetLeft
            //     }
            // }, function setCordinates(){

            //     this.props.setNewCordinates({
            //         width: parseInt(width, 10) + 'px',
            //         left: this.state.customLeft  + 'px',
            //         top: parseInt(top, 10) + 'px'
            //     })
            // })
        }
    }

    TEST_CLIKC_CREAETE_CARD = (listId) => (e) => {
        console.log("CLICK TO CREATE NEW CARD for", listId)
    }

    componentDidMount() {
        // this.setState(prevState => ({
        //     ...prevState,
        //     customLeft: this.button.offsetLeft
        // }))
    }

    // boundElement = (element) => {
    //     if(this.button) return 
    //     this.button = findDOMNode(element)
    // }

    render() {
  
        const {board:
            {boardName, isImportant, reletedTo},
            isMenuInBoardPageShow
        } = this.props

        // const {customLeft} = this.state
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
                                        <ListsContainer {...list} />
                                    </div>
                                )
                            })}
                            {/* here is will render all columns of all lists or will be Route's here perhaps */}
                           
                            <div className='column' id="test">
                            <AddListForm/>
                            {/* <AddListForm> */}

                            </div>

                            {/* <Popup>
                                <Popup.Menu 
                                    title="Create List"
                                    toShow={isCreateListNebuShow} 
                                    component={AddListForm} 
                                />
                            </Popup> */}
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
    // isCreateListNebuShow: menu.isCreateListNebuShow
})

const mapDispatchToProps = (dispatch) => ({
    toggle_menu() {
        dispatch(PopupActions.toggle_menu_on_boardPage())
    },
    setNewCordinates(cords) {
        console.log("New cords is sets ", cords)
        dispatch(PopupActions.get_cordinates(cords))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)


// <CreateList ref={this.boundElement} customLeft={customLeft}>
// create list
// </CreateList>