import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

//compoenents
import List from '../../components/Lists/Lists'
import Board from '../../components/Board/Board'
import Wrapper from '../../components/Wrapper/Wrapper'
import Row from '../../components/Row/Row'
import Title from '../../components/Title/Title'
import BoardActions from '../../actions/BoardAction';


class BoardsList extends React.Component {
    state = {
        isShow: true
    }
    static defaultProps = {
        boards:  [
            {
                title: '',
                boards: []
            }
        ],
        render: () => <span>this.props.render</span>,
        renderChildrenForBoard: () =>  <span>this.props.renderChildrenForBoard</span>,
        Theme:  {
            titleWrapper: ''
        },
        title: ''
    }
    propsCollection = (_id='') => ( {props}={} ) => {
        return {
           _id,
            toggleList: () => {
                this.setState({isShow: !this.state.isShow})
            },
            removeBoard: (id) => {
                this.props.removeBoard(id)
            },
            isShow: this.state.isShow,
            ...props
        }
    }
    renderChildren = (teamId) => {
        const boards = this.props.boards.filter(board => {
            if(board._id === teamId) return board
        })
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {selected: boards[0]})
        })
    }

    render() {
        const {isShow} = this.state
        const {Theme: {titleWrapper}, title} = this.props
        return (
            <div>
                {this.props.boardsGroup.map((team, idx) =>  {
                    let temId_from_Wrapper = team._id ? team._id : idx
    
                    return (
                        <Wrapper key={`${team._id ? team._id : idx}`}>
                            <Row spaceBetween className={titleWrapper}>
                                <Title text={title ? title : team.title} tiny large />
                                {this.props.render(this.propsCollection( team._id ))}
                            </Row>
                            <List style={{display: isShow ? 'block' : 'none'}}>
                                <Fragment>
                                    {team['boards'] instanceof Array 
                                        ? team.boards.map( (board, idx) => (
                                            <Board
                                                {...board} 
                                                key={`${board._id}_${idx}`}
                                            >
                                                {this.props.renderChildrenForBoard(this.propsCollection(board._id))}
                                            </Board>
                                        ))
                                        : null}
                                </Fragment>
                                {this.props.children && <li>{this.renderChildren(team._id)}</li> }
                            </List>
                        </Wrapper>
                    )
                })}
            </div>
        )
    }
} 


const mapStateToProps = ({organizations: {teams}}) => ({boards: teams})

const mapDispatchToProps = (dispatch) => ({
    removeBoard(_id) {
        dispatch( BoardActions.delete_board(_id) )
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardsList))