import React from 'react'
import {connect} from 'react-redux'
//styles
import './SidebarBoards.style.css'
//actions
import PopupActions from '../../actions/EditModeAction'
//components
import Button from '../../components/Button/Button'
import Title from '../../components/Title/Title'
//containers
import BoardList from '../BoardList/BoardList'
import ButtonAddBoard from '../ButtonAddBoard/ButtonAddBoard'
//HOC
import withTheme from '../../HOC/withTheme.js'

// const ToggleListButton = (props) => (
//     <Button onClick={props.toggleList} className='sidebar-button-collapse'>
//         {props.isShow ? "-" : "+"}
//     </Button>
// )

let sidebar =  {
    boardList: {
        titleWrapper: 'sidebar-title-container',
        buttonCollapse: 'sidebar-button-collapse'
    },
    board: {
        wrapperBoard: 'board-sidebar',
        boardControlls: 'board-controll'
    }
} 

class SidebarBoards extends React.Component {
    static styles = ({isFixed, isPinned}) => {
        return {
            display: isFixed ? 'block' : 'none',
            height: isPinned ? window.innerHeight + 'px' : '600px',
            top: isPinned ? '0px' : '63px'
        }
    }

    getElement = (element) => {
        if(this.Sidebar) return
        this.Sidebar = element
    }
    fix_sidebar = (e) => {
        const {width} = this.Sidebar.getBoundingClientRect()
        this.props.fix_sidebar(width)
    }
    render() {
        const { Theme: {boardList}, isPinned, unfix_sidebar } = this.props
        const {fix_sidebar} = this


        return (    
            <div className="sidebar sidebar-fixed" ref={this.getElement} style={SidebarBoards.styles(this.props)}>
                <div>
                    {isPinned && <Title text="Board" large bold />}
                   
                    <div>
                        <label htmlFor='search'> Search: </label>
                        <input type='text' name='search'/>
                    </div>

                    {this.props.children}
                    <div>
                        {!isPinned 
                            ? <Button onClick={fix_sidebar}>
                                — fix board —
                            </Button>
                            : <Button onClick={unfix_sidebar}>
                                — Un fix board —
                            </Button>
                        }

                        <Button onClick={() => {}}>
                            — Create new Board —
                        </Button>
                        <ButtonAddBoard>
                            Add board
                        </ButtonAddBoard>

                    </div>
                </div>

            </div>
        )
    }
}

// {this.props.boards.map(board => (
//     <BoardList
//         Theme={boardList}
//         boardsGroup={[board]} 
//         render={(getProps) => <ToggleListButton {...getProps()} /> }
//         renderChildrenForBoard={(getProps) => <Button {...getProps()}> X </Button>} 
//     />
// ))}

const mapStateToProps = ({mode: {sidebar}, organizations: {teams}})  => ({
    isPinned: sidebar.isPinned,
    isFixed: sidebar.isFixed,
    boards: teams
})

const mapDispatchToProps = (dispatch) => ({
    fix_sidebar(match) {
        dispatch(PopupActions.fix_sidebar(match))
    },
    unfix_sidebar() {
        dispatch(PopupActions.unfix_sidebar())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withTheme(SidebarBoards)(sidebar)
)