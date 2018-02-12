import React from 'react'
import {connect} from 'react-redux'
//styles
import './SidebarBoards.style.css'
//actions
import PopupActions from '../../actions/EditModeAction'
//components
import Button from '../../components/Button/Button'
import Title from '../../components/Title/Title'
import Board from '../../components/Board/Board'
//containers
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
            top: isPinned ? '0px' : '41px'
        }
    }

    state = {
        search: '',
        foundedBoards: []
    }

    getElement = (element) => {
        if(this.Sidebar) return
        this.Sidebar = element
    }
    fix_sidebar = (e) => {
        const {width} = this.Sidebar.getBoundingClientRect()
        this.props.fix_sidebar(width)
    }
    handleChange = ({target}) => {
        let {name, value} = target

        let founded = this.props._boards.filter(board => {
            if( board.boardName.match(this.state.search) ) {
                return board
            }
        })

        this.setState(state => {
            return {
                ...state,
               [name] : value,
               foundedBoards: founded
            }
        })

    }
    render() {

        const { Theme: {boardList}, isPinned, unfix_sidebar } = this.props
        const {fix_sidebar} = this
        const {search, foundedBoards} = this.state

        let SingleBoard = {
            container: 'single-board sidebar-board',
            SettingBoard: "board-input-container"
        }

        return (    
            <div className="sidebar sidebar-fixed" ref={this.getElement} style={SidebarBoards.styles(this.props)}>
                <div>
                    {isPinned && <Title text="Board" large bold />}
                   
                    <div className="sidebar-search">
                        <input
                            value={search}
                            onChange={this.handleChange} 
                            type='text' 
                            name='search' 
                            placeholder='Search board...'
                        />
                    </div>

                    {search.length ? this.state.foundedBoards.map(board => {
                        return <Board key={board._id} {...board} Theme={SingleBoard}/>
                    }) : this.props.children}

                    <div className='sidebar-footer'>

                        <ButtonAddBoard customTop={50} justifyContanteCenter={true} customWidth={415}>
                            {search.length ? `Create board — "${search}"` : `Create new board`}
                        </ButtonAddBoard>

                        {!isPinned 
                            ? <Button onClick={fix_sidebar}>
                               Always keep this menu open
                            </Button>
                            : <Button onClick={unfix_sidebar}>
                               Don't keep this menu open
                            </Button>
                        }

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
    boards: teams,
    _boards: teams.map(team => team.boards).reduce((memo, boards) => memo.concat(boards), [])
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