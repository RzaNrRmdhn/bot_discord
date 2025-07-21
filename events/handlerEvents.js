import sendWarning from './sendWarning.js';
import handleCreateChannel from './createChannel.js';
import handleOnboarding from './onboarding.js';
import handleListWord from './createListWord.js';
import sendMessages from './sendMessages.js';
import handleShowHelp from './showHelp.js';
import handleNotifOpenChat from './sendNotifOpenChat.js';
import handleSuggestorReport from './sendSuggestorReport.js';

export default [
    {
        event: 'messageCreate',
        handler: sendWarning,
    },
    {
        event: 'channelCreate',
        handler: handleCreateChannel,
    },
    {
        event: 'guildMemberAdd',
        handler: handleOnboarding,
    },
    {
        event: 'messageCreate',
        handler: handleListWord,
    },
    {
        event: 'messageCreate',
        handler: sendMessages,
    },
    {
        event: 'messageCreate',
        handler: handleShowHelp,
    },
    {
        event: 'voiceStateUpdate',
        handler: handleNotifOpenChat,
    },
    {
        event: 'interactionCreate',
        handler: handleSuggestorReport,
    },
]