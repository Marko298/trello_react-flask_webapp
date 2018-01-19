import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

//compoenents
import List from '../../components/Lists/Lists'
import Board from '../../components/Board/Board'
import Wrapper from '../../components/Wrapper/Wrapper'
import Row from '../../components/Row/Row'
import Title from '../../components/Title/Title'


class BoardsList extends React.Component {
    static defaultProps = {
        boards:  [
            {
                title: '',
                boards: []
            }
        ],
        render: () => <span>this.props.render</span>
    }
    propsCollection = (_id) => ( {props}={} ) => {
        return {
           _id,
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
        return (
            <div>
                {this.props.boardsGroup.map((team, idx) =>  {
                    let temId_from_Wrapper = team._id ? team._id : idx
    
                    return (
                        <Wrapper key={`${team._id ? team._id : idx}`}>
                            <Row>
                                <Title>  {team.title}  </Title>
                                {this.props.render(this.propsCollection( team._id ))}
                            </Row>
                            <List>
                                <Fragment>
                                {team['boards'] instanceof Array 
                                    ? team.boards.map( (board, idx) => (console.log(temId_from_Wrapper)) || (
                                        <Board
                                            {...board} 
                                            key={`${board._id}_${idx}`}
                                        />
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

export default withRouter(connect(mapStateToProps)(BoardsList))