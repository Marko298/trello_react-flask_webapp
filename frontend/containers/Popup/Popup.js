import React, {Component, Children, Fragment, cloneElement} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
//actions
import PopupActions from '../../actions/EditModeAction'
//components
import Button from '../../components/Button/Button'
import Row from '../../components/Row/Row'
import Wrapper from '../../components/Wrapper/Wrapper'
import Title from '../../components/Title/Title'

//containers
import AddBoardForm from '../AddBoardForm/AddBoardForm'
import AddTeamForm from '../AddTeamForm/AddTeamForm'

class Popup extends Component {

    static Menu = (props) => {
        
        const PopupMenuComponent = () => (
            <Fragment>
                <Wrapper>
                    <Row>
                        <Title>{props.title}</Title>
                        <Button onClick={props.close}>
                            X (close)
                        </Button>
                    </Row>
                </Wrapper>
                <section>
                    <props.component />
                </section>
            </Fragment>
        )

        return props.toShow && <PopupMenuComponent />
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location.pathname !== this.props.location.pathname && this.props.isPopupShow) {
            this.props.toggle()
        }
    }

    renderChildren = () => {

        const {children, toggle} = this.props

        return Children.map(children, child => {
            let updatedChild = cloneElement(child, {close: toggle} )
            return updatedChild
        })
    }
    

    render() {
        
        const {width, top, left, isPopupShow} = this.props
        const styles = {width, top, left, display: isPopupShow ? 'block' : 'none'}

        return (
            <div className='test-box' style={{...styles}}>
                {this.renderChildren()}
            </div>
        )
    }
}

const mapStateToProps = ({mode, organizations: {teams}}) => ({
    top: mode.top,
    left: mode.left,
    width: mode.width,
    isPopupShow: mode.forms.isPopupShow
})

const mapDispatchToProps = (dispatch) => ({
    toggle() {
        dispatch(PopupActions.toggle_editMode())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Popup))