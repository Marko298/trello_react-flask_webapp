import React, {Component} from 'react'
import {connect} from 'react-redux'

import './EditForm.css'

//actions
import {toggle_editMode} from '../../actions/EditModeAction'

//components 
import Form from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Title from '../../components/Title/Title'
import Wrapper from '../../components/Wrapper/Wrapper'
import Row from '../../components/Row/Row'

class EditForm extends Component {
    header = () => {
        return (
            <Wrapper>
                <Row>
                    <Title>Create Board</Title>
                    <Button>
                        X (close)
                    </Button>
                </Row>
            </Wrapper>
        )
    }
    _handleClick = () => {
        console.log(this)
        console.log("EditForm click")
    }
    componentDidMount(){
        console.log(this)
    }
    render() {
        return (
            <div className='test-box'>
                <Form renderHeader={this.header}>
                    <Input>
                        field
                    </Input>
                    <Input>
                        dropdown
                    </Input>
                    <Button onClick={this._handleClick}>
                        create
                    </Button>
                </Form>
            </div>
        )
    }
}

// const initialEditModeState = {
//     mods: {
//         forms: {
//             isEditBoardShow: false
//         },
//         top: 0,
//         left: 0,
//         width: 0
//     }
// }


// const mapStateToProps = ({mods}) => ({
//     top: mods.top,
//     left: mods.left,
//     width: mods.width,
// })

export default connect(null, {toggle_editMode})(EditForm)