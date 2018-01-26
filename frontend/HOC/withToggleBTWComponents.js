import React from 'react'
import {connect} from 'react-redux'

import PopupActions from '../actions/EditModeAction'

export default function withToggleBTWComponents(Component) {
    return function({FirstComponent, SecondComponent}) {
        function Wrapper(props) {
            return (
                <Component {...props}>
                {({forFirst, forSecond}) => {
                    return (
                        props.showFirstOne && <FirstComponent 
                            {...forFirst} 
                            toggle={() => {
                                console.log("SWITH TO SECOND")
                                props.swithcComponentTo('first')
                            }}
                        />
                        ||
                        props.showSecondOne && <SecondComponent 
                            {...forSecond} 
                            toggle={() => {
                                props.swithcComponentTo('second')
                            }}
                        />
                    )
                }}
                </Component>
            )
        }
        Wrapper.defaultProps = {
            swithcComponentTo: () => {}
        }
        const mapStateToProps = ({mode: {switchBetweenComponents}}) => ({
            showFirstOne: switchBetweenComponents.toShowFirstComponent,
            showSecondOne: switchBetweenComponents.toShowSecondComponent
        })
        const mapDispatchToProps = (dispatch) => ({
            swithcComponentTo(from) {
                dispatch(PopupActions.swtich_between_components(from))
            }
        })
        return connect(mapStateToProps, mapDispatchToProps)(Wrapper)
    }
}