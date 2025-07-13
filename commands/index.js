import sendMessages from './sendMessages.js';
import replyMessage from './replyMessages.js'
import sendMessagesHandler from '../handlers/sendMessages.js';
import replyMessageHandler from '../handlers/replyMessages.js';
import helpCommand from './help.js';
import helpHandler from '../handlers/help.js';

export default [
    {
        command: sendMessages(),
        handler: sendMessagesHandler,
    },
    {
        command: replyMessage(),
        handler: replyMessageHandler,
    },
    {
        command: helpCommand(),
        handler: helpHandler,
    },
];
