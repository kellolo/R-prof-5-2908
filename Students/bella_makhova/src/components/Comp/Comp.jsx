import './style.css';

import React from 'react';
import { Component } from 'react';
import InputComp from '../CompInputTest/comp.jsx';
import FieldComp from '../CompFieldTest/comp.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import  { sendMessage } from '../../store/actions/messages-actions';

class MessageField extends Component {

    send = (text, sender = 'me') => {
        this.props.sendMessage(text, sender);
    }

    componentDidUpdate() {
        if (this.props.messages[this.props.messages.length - 1].sender === 'me') {
            setTimeout(() =>
                    this.props.sendMessage(
                        'i\'m thinking...',
                        'bot'
                    ),
                700
            );
        }

    }

    render() {
        return (
            <div className="d-flex flex-column compField">
               <FieldComp messages = { this.props.messages } />
               <InputComp send = { this.send } />
            </div>
        )
    }
}


const mapStateToProps = ({ msgReducer }) => ({
    messages: msgReducer.messages
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);