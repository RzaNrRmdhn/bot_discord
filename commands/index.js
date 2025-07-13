import sendMessages from './sendMessages.js';
import replyMessage from './replyMessages.js'
import sendMessagesHandler from '../handlers/sendMessages.js';
import replyMessageHandler from '../handlers/replyMessages.js';

export default [
    {
        command: sendMessages(),
        handler: sendMessagesHandler,
    },
    {
        command: replyMessage(),
        handler: replyMessageHandler,
    },
];
