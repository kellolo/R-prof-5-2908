import './style.css';
import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import ChatsDialog from '../ChatsDialog/ChatsDialog.jsx';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Item from '../ChatListItem/ChatListItem.jsx';
import ContentSend from 'material-ui/svg-icons/content/send';
import PropTypes from "prop-types";
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import { TextField, FloatingActionButton } from 'material-ui';
import { addChat } from '../../store/actions/chatActions.js';
import { loadChats } from '../../store/actions/chatActions.js';
import { sendMessage } from '../../store/actions/messageActions.js';
import { push } from 'connected-react-router';

class ChatList extends Component {
    static propTypes = {
        chats: PropTypes.object.isRequired,
        addChat: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
        chatId: PropTypes.number.isRequired,
        sendMessage: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
    };

    state = {
        input: '',
        openDialog: false,
    }; 

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
 
    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            this.handleAddChat();
        }
    };
 
    handleAddChat = () => {
        if (this.state.input.length > 0) {
            this.props.addChat(this.state.input);
            this.setState({ input: '' });
        }
    };

    handleNavigate = (link) => {
        this.props.push(link);
    }

    handleClose = (value) => {
        this.setState({ openDialog: false });
        if (value !== '') {
            this.props.addChat(value);
        }
    }

    handleOpenChatstDialog = () => {
        this.setState({ openDialog: true });
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.isLoading) {
            const { chats } = this.props;
            const prevCountChats = Object.keys(prevProps.chats).length;
            const countChats = Object.keys(chats).length;
            if (prevCountChats !== countChats) {
                this.props.sendMessage(
                    Object.keys(this.props.messages).length + 1,
                    `Привет, ${chats[countChats].title} !`,
                    'bot',
                    countChats
                );
                this.handleNavigate(`/chat/${countChats}`);
                this.props.loadChats();
            }
        }
    }

    render() {
        const  { chats } = this.props;
        // let chatElements = Object.keys(chats).map(ch =>  <Link to = {`/chat/${ch.id}/`} key = { ch.id }>
        //                                     <Item name={ch.name} />
        //                                 </Link>)
        const chatElements = Object.keys(chats).map(chatId => (
            <ListItem
                button
                key={ chatId }
                onClick={ () => this.handleNavigate(`/chat/${chatId}`) }
            >
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary={ chats[chatId].title } />
            </ListItem>
        ))
        console.log(chatElements);

        return (
            <div className="ChatList d-flex flex-column">
               <List className='list'>
                    { chatElements }
                    <ListItem
                        key="Add new chat"
                        leftIcon={ <AddIcon /> }
                        onClick={ () => { this.setState({ openDialog: true }) } }
                        style={ { height: '60px', width: '90%' } } 
                        // children= {
                        //     <TextField
                        //         key="textField"
                        //         fullWidth
                        //         name="input"
                        //         hintText="Добавить новый чат"
                        //         style={ { fontSize: '16px', alignItems: 'top'} }
                        //         onChange={ this.handleChange }
                        //         value={ this.state.input }
                        //         onKeyUp={ this.handleKeyUp }
                        //     />
                        // }
                    >
                    <FloatingActionButton 
                        style={ { outline: 'none' } }
                        onClick={ this.handleOpenContactsList }>
                        <ListItemIcon>
                            <AddIcon style={ { margin: 'auto' } } />
                        </ListItemIcon>
                    </FloatingActionButton>
                    <ChatsDialog selectedValue={''} open={this.state.openDialog} onClose={ this.handleClose } />

                    <TextField
                        key="textField"
                        fullWidth
                        name="input"
                        hintText="Добавить новый чат"
                        style={ { fontSize: '16px', alignItems: 'top'} }
                        onChange={ this.handleChange }
                        value={ this.state.input }
                        onKeyUp={ this.handleKeyUp }
                    />
                    </ListItem>
                </List> 
                {/* <div>
                    <ChatsDialog />
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = ({ messageReducer, chatReducer }) => ({
    chats: chatReducer.chats,
    messages: messageReducer.messages,
    isLoading: chatReducer.isLoading,
 });
 
 const mapDispatchToProps = dispatch => bindActionCreators({ addChat, sendMessage, push, loadChats  }, dispatch);
 
 export default connect(mapStateToProps, mapDispatchToProps)(ChatList);