import React, {Component} from 'react'
import {connect} from 'react-redux'

//styles
import './LabelList.style.css'
//components
import LabelBox from '../../components/LabelBox/LabelBox'
import CardActions from '../../actions/CardAction';

class LabelList extends Component {

    state = {
        selectedLabels: []
    }
    
    handleClick = (label) => (e) => {

        this.setState((state) => {
            if(state.selectedLabels.length === 0) {
                return {
                    selectedLabels: [...state.selectedLabels, label]
                }
            }

            let stateCopy = [...state.selectedLabels]
            let forEach = Array.prototype.forEach

            forEach.call(stateCopy, function(existingLabel, idx, thisArr) {

                let theEndOfArray = idx === (thisArr.length - 1)
                let isTheSameId = existingLabel._id === label._id
                let isIdDifferent = existingLabel._id !== label._id

                if( isTheSameId ) {
                    stateCopy.splice(idx, 1)
                }

                if( isIdDifferent && theEndOfArray ) {
                    stateCopy.push(label)
                }
            })

            return {...state, selectedLabels: [...stateCopy]}
        }, function() {
            this.props.add_label()
            console.log("added label ", this.state.selectedLabels, " for ", this.props.cardId)
            // this.props.add_label()
        })

    }

    renderChildren = () => {

        const {labels} = this.props
        const {handleClick} = this
        const selectedId = this.state.selectedLabels.map(label => label._id)

        return labels.map(label => {
            return (
                <LabelBox
                    handleClick={handleClick} 
                    key={label._id} 
                    {...label} 
                    selectedLabels={selectedId}
                />
            )
        })

    }
    render() {
        return (
            <div className="label-list">
                {this.renderChildren()}
            </div>
        )
    }

    componentWillUnmount() {
        if(this.state.selectedLabels.length > 0) {
            console.log("ADDD THIS TO THE STATE")
        }
    }
}



const mapStateToProps = ({
    user, 
    mode: {selected}
}) => ({
    labels: user.labels,
    cardId: selected._id
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    add_label() {
        
        // dispatch(CardActions.add_labels())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LabelList)