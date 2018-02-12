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

import './Popup.style.css'


const GoBack = (props) => {
    return (
        <Button onClick={props.onClick}>
            <i className="fas fa-arrow-left" />
        </Button>
    )
}

class Popup extends Component {
    state = {
        allowStepBack: false
    }

   

    static Menu = class extends Component {

        static defaultProps = {
            withHeader: true
        }

        componentWillReceiveProps(next) {
            if( next.withOverlay && next.toShow ) {
                let {props} = this
                console.log("componentWillReceiveProps", {props}, {next})
            }
            if ( next.withOverlay && next.toShow ) {
                if( !this.props.toShow && !next.withOverlayReducer ) {
                    this.props.dispatch ( PopupActions.toggle_overlay() )
                }
            }
        }

     
        render() {
            return this.props.toShow && (
                <Fragment>
                    <div className={this.props.withHeader ? 'pop-up-bg' : ''}>
                        {this.props.withHeader &&
                        <Wrapper>
                            <div className="pop-up__header">
                                {this.props.stepBack && this.props.stepBackWithAction && <GoBack onClick={(e) => {
                                    this.props.dispatch(this.props.stepBackWithAction())
                                }}/>}

                                <div className='pop-up__inner'>
                                    <Title text={this.props.title} medium tiny className='pop-up__title'/>
                                    <Button onClick={this.props.close} >
                                        <i className="fas fa-times" />
                                    </Button>
                                </div>
                            </div>
                        </Wrapper>}
                        <section>
                            <this.props.component close={this.props.close}/>
                        </section>
                    </div>
                </Fragment>
            )
        }
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

    }

    componentWillUnmount() {
        this.props.isPopupShow && this.toggle()
    }

  


    componentDidUpdate(prevProps, prevState) {
        if(!this.props.isPopupShow && this.state.allowStepBack) {
            this.setState(state => ({
                ...state,
                allowStepBack: false
            }))
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
      const {isPopupShow, dispatch, reducerOverlay} = this.props
      isPopupShow && dispatch(PopupActions.toggle_editMode())
      reducerOverlay && dispatch(PopupActions.toggle_overlay())
    
    }

   
    renderChildren = () => {

        const {children, reducerOverlay} = this.props

        return Children.map(children, child => {
            let updatedChild = cloneElement(child, {
                close: this.toggle,
                withOverlayReducer: reducerOverlay,
                stepBack: this.state.allowStepBack,
                ...this.props} )
            return updatedChild
        })
    }

    render() {

        const {width, top, left, isPopupShow} = this.props
        const styles = {width, top, left, display: isPopupShow ? 'block' : 'none'}

        return (
            <div className='pop-up' style={{...styles}}>
                {this.renderChildren()}
            </div>
        )
    }
}

const mapStateToProps = ({mode, mode: {menu, withOverlayScene}, organizations: {teams}}) => ({
    top: mode.top,
    left: mode.left,
    width: mode.width,
    isPopupShow: mode.forms.isPopupShow,
    menu: {...menu},
    reducerOverlay: withOverlayScene
})

export default withRouter(connect(mapStateToProps, null)(Popup))