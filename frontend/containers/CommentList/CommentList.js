import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {func} from 'prop-types'
import {connect} from 'react-redux'
//actions
import CommentActions from '../../actions/CommentAction';

class CommentList extends Component {
    static defaultProps = { comments: [] }
    static propTypes = { children: func.isRequired }

    render() {
        const {comments, children} = this.props
        
        return children(comments)
    }

    componentDidMount() {
        this.props.fetch_comments()
    }
}


const mapStateToProps = ({
    lists: {comments}
}) => ({
    comments: comments.commentList
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetch_comments() {
        const {cardId} = ownProps.match.params
        dispatch( CommentActions.get_comments_with_authors(cardId) )
    }
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CommentList)
)