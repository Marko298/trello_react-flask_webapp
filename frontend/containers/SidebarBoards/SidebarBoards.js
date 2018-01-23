import React from 'react'
import {connect} from 'react-redux'
//styles
import './SidebarBoards.style.css'
//actions
import PopupActions from '../../actions/EditModeAction'
//components
import Button from '../../components/Button/Button'
//containers
import BoardList from '../BoardList/BoardList'
//HOC
import withTheme from '../../HOC/withTheme.js'

const ToggleListButton = (props) => (
    <Button onClick={props.toggleList} className='sidebar-button-collapse'>
        {props.isShow ? "-" : "+"}
    </Button>
)

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
            height: isPinned ? window.innerHeight + 'px' : '600px'
        }
    }
    componentDidMount() {
        console.log("SidebarBoards componentDidMount")
        console.log("this.Sidebar ", )
    }
    getElement = (element) => {
        if(this.Sidebar) return
        this.Sidebar = element
    }
    handleClick = (e) => {
        const {width} = this.Sidebar.getBoundingClientRect()
        this.props.fix_sidebar(width)
    }
    render() {
        const { Theme: {boardList} } = this.props


        return (    
            <div className="sidebar sidebar-fixed" ref={this.getElement} style={SidebarBoards.styles(this.props)}>
                <div>
                    <div>
                        <label htmlFor='search'> Search: </label>
                        <input type='text' name='search'/>
                    </div>
                    {this.props.boards.map(board => (
                        <BoardList
                            Theme={boardList}
                            boardsGroup={[board]} 
                            render={(getProps) => <ToggleListButton {...getProps()} /> }
                            renderChildrenForBoard={(getProps) => <Button {...getProps()}> X </Button>} 
                        />
                    ))}

                    <div>
                        <Button onClick={this.handleClick}>
                            fix board
                        </Button>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = ({mode: {sidebar}, organizations: {teams}})  => ({
    isPinned: sidebar.isPinned,
    isFixed: sidebar.isFixed,
    boards: teams
})

const mapDispatchToProps = (dispatch) => ({
    fix_sidebar(match) {
        dispatch(PopupActions.fix_sidebar(match))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withTheme(SidebarBoards)(sidebar)
)