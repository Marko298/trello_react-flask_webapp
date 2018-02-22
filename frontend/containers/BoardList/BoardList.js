import React, {Fragment, Children, cloneElement} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import update from 'immutability-helper'
//styles
import './BoardList.style.css'
//compoenents
import List from '../../components/Lists/Lists'
import Board from '../../components/Board/Board'
import Wrapper from '../../components/Wrapper/Wrapper'
import Row from '../../components/Row/Row'
import Title from '../../components/Title/Title'
import Avatarka from '../../components/Avatarka/Avatarka'
//action
import BoardActions from '../../actions/BoardAction';

import GroupIcn from 'react-svg-loader!../../__asssets/icons/group.svg'


class BoardsList extends React.Component {
    state = {
        isShow: true,
        // organization: this.props.boardsGroup
    }
    static defaultProps = {
        boards:  [
            {
                title: '',
                boards: []
            }
        ],
        render: () => {},
        renderChildrenForBoard: () =>  {},
        Theme:  {
            titleWrapper: '',
            Board: {}
        },
        title: ''
    }

    moveBoard = (dragIndex, hoverIndex) => {
        console.log("moveBoard", dragIndex, hoverIndex)

        // this.setState( (state) => {
        //     return update(state, {
        //         organization: {}
        //     })
        // })
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
        return Children.map(this.props.children, child => {
            return cloneElement(child, {selected: boards[0]})
        })
    }

    render() {
        const {isShow} = this.state
        const {Theme:{ 
            titleWrapper,
            BoardsLine,
            SingleBoard,
            BoardList,
            title: headerTitle}, 
            title, status} = this.props
        return (
            <div>
                {this.props.boardsGroup.map((team, idx) =>  {
                    let temId_from_Wrapper = team._id ? team._id : idx
                    return (
                        <Wrapper key={idx} className={BoardList}>
                            <Row className={titleWrapper}>
                                <div className='image-organization-wrapper'>
                                    {team.photo 
                                        ? <Avatarka src={team.photo} small ractangle /> 
                                        : <GroupIcn width="30px" />}  
                                </div>
                                <Title text={title ? title : team.title} tiny large {...headerTitle}/>
                                {this.props.render(this.propsCollection( team._id ))}
                            </Row>
                            <div style={{display: isShow ? 'block' : 'none'}}>
                                <List  className={BoardsLine}>
                                    <Fragment>
                                        {team['boards'] instanceof Array 
                                            ? team.boards.map( (board, idx) => (
                                                <Board
                                                    moveBoard={this.moveBoard}
                                                    index={idx}
                                                    status={status}
                                                    Theme={SingleBoard}
                                                    {...board} 
                                                    key={`${board._id}_${idx}`}
                                                >
                                                    {this.props.renderChildrenForBoard(this.propsCollection(board._id))}
                                                </Board>
                                            ))
                                            : null}
                                    </Fragment>
                                    {this.props.children && <li className='single-board button-board'>{this.renderChildren(team._id)}</li> }
                                </List>
                            </div>
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
// export default connect(mapStateToProps, mapDispatchToProps)(BoardsList)