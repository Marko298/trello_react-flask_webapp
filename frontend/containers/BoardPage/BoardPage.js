import React, {Component} from 'react'
import {connect} from 'react-redux'

//components
import Button from '../../components/Button/Button'
import Title from '../../components/Title/Title'
import Input from '../Input/Input'
//HOC
import withEditMode from '../../HOC/withEditMode'
//actions
import PopupActions from '../../actions/EditModeAction'

//styles
import './BoardPage.style.css'


let actionCreateList = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_create_list_menu
})
let CreateList = withEditMode(actionCreateList)(Button)

class BoardPage extends Component {
    static defaultProps = {
        lists: [],
        isPostRequstPending: false
    }
    handleClickMenuToggle = (e) => {
        this.props.toggle_menu()
    }
    render() {
        const {board:
            {boardName, isImportant, reletedTo},
            isMenuInBoardPageShow
        } = this.props
        return (
            <div className='bord-canvas'>
                <div className='board-content'>
                    <header>
                        {/* The header will be here as native  */}
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
                    <section >
                        {/* here is will render all columns of all lists or will be Route's here perhaps */}
                        <CreateList>
                            create list
                        </CreateList>
                    </section>
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
    mode: {isMenuInBoardPageShow}}
) => ({
    lists: boardProject.lists,
    isPostRequstPending : status.isPostRequstPending,
    isMenuInBoardPageShow: isMenuInBoardPageShow
})

const mapDispatchToProps = (dispatch) => ({
    toggle_menu() {
        dispatch(PopupActions.toggle_menu_on_boardPage())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)