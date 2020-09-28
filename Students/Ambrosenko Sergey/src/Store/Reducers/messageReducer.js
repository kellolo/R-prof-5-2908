import update from 'react-addons-update';
import { SEND_MESSAGE } from '../Actions/messageActions.js';


const initialStore = {
    messages: {
        1: { text: "Баланс Вашего счета 5.35 руб.", sender: 'Bot' },
        2: { text: "Доступ к интернету заблокирован", sender: 'Bot' },
        3: { text: "Поздравляю! Вам одобрен кредит!", sender: 'Bot' },
    }
};


export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            return update(store, {
                messages: { $merge: { [action.messageId]: {text: action.text, sender: action.sender} } },
            });
        }
        default:
            return store;
    }
}