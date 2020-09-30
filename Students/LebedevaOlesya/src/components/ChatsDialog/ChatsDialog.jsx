import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import cyan from '@material-ui/core/colors/cyan';
import Button from '@material-ui/core/Button';
import ContentSend from 'material-ui/svg-icons/content/send';
import ChatsDialog from '../ChatsDialog/ChatsDialog.jsx';


const emails = [
  <Link to="/chat/1/"><ListItemText primary="Chat 1"/></Link>, 
  <Link to="/chat/2/"><ListItemText primary="Chat 2"/></Link>, 
  <Link to="/chat/3/"><ListItemText primary="Chat 3"/></Link>
];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: cyan[100],
    color: cyan[600],
  },
  testClass: {
    fontSize: '10em',
  },
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function ContactsList(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Выбрать чат</DialogTitle>
      <List>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} className={classes.testClass} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}