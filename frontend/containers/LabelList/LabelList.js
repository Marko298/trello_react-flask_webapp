import React, {Component} from 'react'
import {connect} from 'react-redux'
//styles
import './LabelList.style.css'
//components
import LabelBox from '../../components/LabelBox/LabelBox'
import CardActions from '../../actions/CardAction';

class LabelList extends Component {

    static defaultProps = {
        card: {
            labels: []
        }
    }

    handleClick = (label) => (e) => {
        const {card: {_id, forList}, add_label} = this.props
        add_label(_id, label, forList)

    }

    renderChildren = () => {

        let {labels, card} = this.props
        let {handleClick} = this
        let selectedId = Array.isArray(card.labels) ? card.labels.map(label => label._id) : []

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

    componentDidUpdate(prev){
        if(prev.isPopUpShow && !this.props.isPopUpShow && prev.isLabelListShow) {
            prev.save_labels(prev.card._id, prev.card.labels, prev.card.forList)
        }
    }
}



const mapStateToProps = ({
    user, 
    mode: {selected, forms, menu},
    lists: {boardProject}
}) => ({
    labels: user.labels,
    card: boardProject.lists
        .filter(list => list._id === selected.forList)
        .map(list => {
            return list.cards.filter(card => card._id === selected._id)[0]
        })[0],
    isPopUpShow: forms.isPopupShow,
    isLabelListShow: menu.isLabelListShow
})


const mapDispatchToProps = (dispatch, ownProps) => ({
    add_label(card_id, label, forList) {
        dispatch(CardActions.add_labels(card_id, label, forList))
    },
    save_labels(card_id, label, forList) {
        dispatch(CardActions.add_labels_request(card_id, label, forList))
        
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LabelList)




