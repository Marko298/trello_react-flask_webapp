import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

//compoenents
import List from '../../components/Lists/Lists'
import Board from '../../components/Board/Board'
import Wrapper from '../../components/Wrapper/Wrapper'


class BoardsList extends React.Component {
    propsCollection = (_id) => ( {props}={} ) => {
        return {
           _id,
            ...props
        }
    }
    render() {
        return (
            <div>
                {this.props.boardsGroup.map((team, idx) =>  {
                    let temId_from_Wrapper = team._id ? team._id : idx
    
                    return (
                        <Wrapper key={`${team._id ? team._id : idx}`}>
                            <header>
                                <h3>{team.title}</h3>
                                {this.props.render(this.propsCollection( team._id ))}
                            </header>
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
                                {/* switch render props with children places, and in render props give the object of board list for  */}
                                {this.props.children && <li>{this.props.children}</li> }
                            </List>
                        </Wrapper>
                    )
                })}
            </div>
        )
    }
} 
// function BoardsList(props) {
//     const propsCollection = (_id) => ( {props}={} ) => {
//         return {
//            _id,
//             ...props
//         }
//     }
//     return (
//         <div>
//             {props.boardsGroup.map((team, idx) =>  {
//                 let temId_from_Wrapper = team._id ? team._id : idx

//                 return (
//                     <Wrapper key={`${team._id ? team._id : idx}`}>
//                         <header>
//                             <h3>{team.title}</h3>
//                             {props.render(propsCollection( team._id ))}
//                         </header>
//                         <List>
//                             <Fragment>
//                             {team['boards'] instanceof Array 
//                                 ? team.boards.map( (board, idx) => (console.log(temId_from_Wrapper)) || (
//                                     <Board
//                                         {...board} 
//                                         key={`${board._id}_${idx}`}
//                                     />
//                                 ))
//                                 : null}
//                             </Fragment>
//                             {/* switch render props with children places, and in render props give the object of board list for  */}
//                             {props.children && <li>{props.children}</li> }
//                         </List>
//                     </Wrapper>
//                 )
//             })}
//         </div>
//     )
// }

BoardsList.defaultProps = {
    boardsGroup:  [
        {
            title: '',
            boards: []
        }
    ],
    render: () => <span>this.props.render</span>
}


const mapStateToProps = ({boardsGroup: boards}) => ({boards})

export default withRouter(connect(mapStateToProps)(BoardsList))