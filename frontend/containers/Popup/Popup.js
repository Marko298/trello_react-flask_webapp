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
//HOC
import withEditMode from '../../HOC/withEditMode'
const actions = () => ({
    menu: PopupActions.toggle_creative_menu
})
let CreativeMenu = withEditMode(actions)(Button)
{/* <CreativeMenu>
    back
</CreativeMenu> */}

// {props.render()}

const GoBack = (props) => {
    return (
        <button onClick={props.onClick}>back</button>
    )
}
class Popup extends Component {
    state = {
        allowStepBack: false
    }

    static Menu = (props) => {

        const PopupMenuComponent = () => (
            <Fragment>
                <Wrapper>
                    <Row>
                        {props.stepBack && props.stepBackWithAction && <GoBack onClick={(e) => {
                            props.dispatch(props.stepBackWithAction())
                        }}/>}
                        <Title text={props.title} />
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
        if(this.props.menu.isCreativeMenuShow 
            && (nextProps.menu.isCreateTeamFormShow || nextProps.menu.isCreateBoardFormShow)
            && !this.state.allowStepBack) {

            this.setState({
                allowStepBack: true
            })
        }

        if(this.props.location.pathname !== nextProps.location.pathname && nextProps.isPopupShow) {
            this.toggle()
        }
        // console.log("_____________________________________________")
        // console.log("componentWillReceiveProps, Popup", 
        // "nextProps.isPopupShow", nextProps.menu, this.props.menu, this.state)
        // console.log("_____________________________________________")
    }


    componentDidUpdate(prevProps, prevState) {
        if(!this.props.isPopupShow && this.state.allowStepBack) {
            this.setState({
                allowStepBack: false
            })
        }

        // if( prevProps.menu.isCreativeMenuShow && this.props.allowStepBack) {
        // }
        // if(!this.props.menu.isCreateBoardFormShow && !this.props.isPopupShow && prevState.allowStepBack ) {
        //     this.setState({
        //         allowStepBack: false
        //     })
        // }
        // if(!this.props.isPopupShow && prevState.allowStepBack) {
        //     console.log("WE SWEITCH TO FALSE")
        // }
        // if(this.props.isPopupShow && prevProps.isPopupShow && this.state.allowStepBack && !prevState.allowStepBack) {
        //     // console.log("STAR WARS")
        // }
        // console.log("componentDidUpdate ", prevProps.menu, {prevState}, this.props.menu, this.state)

        // console.log("componentDidUpdate",prevProps,this.props)
    }

    toggle = () => {
        this.props.dispatch(PopupActions.toggle_editMode())
    }

    renderChildren = () => {

        const {children} = this.props

        return Children.map(children, child => {
            let updatedChild = cloneElement(child, {
                close: this.toggle,
                stepBack: this.state.allowStepBack,
                ...this.props} )
            return updatedChild
        })
    }

    render() {
        
        const {width, top, left, isPopupShow} = this.props
        const styles = {width, top, left, display: isPopupShow ? 'block' : 'none'}

        return (
            <div className='test-box' style={{...styles}} >
                {this.renderChildren()}
            </div>
        )
    }
}

const mapStateToProps = ({mode, mode: {menu}, organizations: {teams}}) => ({
    top: mode.top,
    left: mode.left,
    width: mode.width,
    isPopupShow: mode.forms.isPopupShow,
    menu: {...menu}
})

// const mapDispatchToProps = (dispatch) => ({
//     toggle() {
//         dispatch(PopupActions.toggle_editMode())
//     }
// })

export default withRouter(connect(mapStateToProps, null)(Popup))