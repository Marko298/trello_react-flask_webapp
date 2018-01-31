import React from 'react'

export default function withToggleBTWComponents(Component) {
    return function({FirstComponent, SecondComponent}) {
        return class Wrapper extends React.Component {
            state = {
                showFirstOne: true,
                showSecondOne: false
            }

            swithcComponentTo = (path) => () => {
                if(path === 'second'){
                    this.setState((prevState) => ({
                        showFirstOne: true,
                        showSecondOne: false
                    }))
                }
                if(path === 'first'){
                    this.setState((prevState) => ({
                        showFirstOne: false,
                        showSecondOne: true
                    }))
                }
            }

            render() {
                const {showFirstOne, showSecondOne} = this.state
                const {swithcComponentTo} = this
                
                return (
                    <Component {...this.props}>
                        {({forFirst, forSecond}={}) => {
                            return (
                                showFirstOne && <FirstComponent 
                                    {...forFirst} 
                                    toggle={swithcComponentTo('first')}
                                />
                                ||
                                showSecondOne && <SecondComponent 
                                    {...forSecond} 
                                    toggle={swithcComponentTo('second')}
                                />
                            )
                        }}
                    </Component>
                )
            }
        }
    }
}